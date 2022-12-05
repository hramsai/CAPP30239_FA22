// Harish Ram Sai
// Amount Spent by Sector - Line Chart
// Viz # 1

(function() {
    const margin = {top: 10, right: 50, bottom: 30, left: 30},
        width = 830 - margin.left - margin.right,
        height = 560 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    const linesvg = d3.select("#line_chart")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    d3.csv("Data/data.csv").then(data => {
        console.log(data)
    
        for (let d of data) {
          d.transaction_year = new Date(+d.transaction_year, 0); 
        }

        var allGroup = new Set(d3.map(data, function(d){return(d.primary_sectors)}))// List of groups 

        d3.select("#selectButton")
          .selectAll('myOptions')
            .data(allGroup)
          .enter()
            .append('option')
          .text(function (d) { return d; }) // text showed in the menu
          .attr("value", function (d) { return d; }) // corresponding value returned by the button
        
        console.log(allGroup)
        console.log('allgroup', allGroup)

        // A color scale: one color for each group
        let myColor = d3.scaleOrdinal()
          .domain(allGroup)
          .range(d3.schemeSet2);
    
        let x = d3.scaleTime()
          .domain(d3.extent(data, function(d) { return d.transaction_year; }))
          .range([ 0, width ]);
          
        linesvg.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x).ticks(10).tickFormat(d3.timeFormat("%Y")));
    
        // Add Y axis
        let y = d3.scaleLinear()
          .domain([0, d3.max(data, function(d) {return +d.total_commitments;})])
          .range([ height, 0 ]);
    
        linesvg.append("g")
        .call(d3.axisLeft(y)
          .tickSizeOuter(0)
          .tickFormat((d) => d3.format("$.2s")(d).replace(/G/, "B")));

        linesvg.append("rect")
          .attr('x', 225)
          .attr('y', 40)
          .attr('width', 150)
          .attr('height', 480)
          .attr('stroke', 'white')
          .attr('fill', '#69a3b2')
          .attr('opacity', 0.2); // adding a box for the great depression period
      
        linesvg.append("text")
          .attr("y", 70)
          .attr("x", 270)
          .text("Great Recission"); // adding text

        linesvg.append("text")
          .attr("class", "x label")
          .attr("text-anchor", "end")
          .attr("x", width + 15)
          .attr("y", height - 10)
          .text("Years");

        linesvg.append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", 6)
          .attr("x", -30)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Money Disbursed (USD)");
        
        // Initialize line with group a
        let line = linesvg
          .append('g')
          .append("path")
            .datum(data)
            .attr("d", d3.line()
              .x(function(d) { return x(d.transaction_year) })
              .y(function(d) { return y(+d.total_commitments) })
              .curve(d3.curveNatural)
            )
            .attr("stroke", function(d){ return myColor("Agriculture, forestry, fishing") })
            .style("stroke-width", 4)
            .style("fill", "none")
    
        // A function that update the chart
        function update(selectedGroup) {
    
          // Create new data with the selection?
          let dataFilter = data.filter(function(d){return d.primary_sectors==selectedGroup})
    
          // Give these new data to update line
          line
              .datum(dataFilter)
              .transition()
              .duration(1000)
              .attr("d", d3.line()
                .x(function(d) { return x(d.transaction_year) })
                .y(function(d) { return y(+d.total_commitments) })
                .curve(d3.curveNatural)
              )
              .attr("stroke", function(d){ return myColor(selectedGroup) })
        }
    
        // When the button is changed, run the updateChart function
        d3.select("#selectButton").on("change", function(d) {
            // recover the option that has been chosen
            let selectedOption = d3.select(this).property("value")
            // run the updateChart function with this selected option
            update(selectedOption)
        })

        update("Agriculture, forestry, fishing") // initialising the chart for the first group

    });
    
})();
    