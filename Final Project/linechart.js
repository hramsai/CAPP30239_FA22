var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 890 - margin.left - margin.right,
    height = 560 - margin.top - margin.bottom;

// append the svg object to the body of the page
var linesvg = d3.select("#line_chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("Data/data.csv", function(data) {
    console.log(data)

    for (let d of data) {
      d.transaction_year = new Date(+d.transaction_year, 0);
    }
    
    var allGroup = d3.map(data, function(d){return(d.primary_sectors)}).keys() // List of groups 

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.transaction_year; }))
      .range([ 0, width ]);
      
    linesvg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(10).tickFormat(d3.timeFormat("%Y"))); // ?? dates are getting converted to 1969?

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) {return +d.total_commitments;})])
      .range([ height, 0 ]);

    linesvg.append("g")
    .call(d3.axisLeft(y)
      .tickSizeOuter(0)
      .tickFormat((d) => d3.format("$.2s")(d).replace(/G/, "B")));

    linesvg.append("line")
      .attr("y1", 50)
      .attr("y2", 510)
      .attr("x2", 401)
      .attr("x1", 400)
      .style("stroke-width", 2)
      .style("fill", "none")

    linesvg.append("text")
      .attr("y", 200)
      // .attr("y2", 510)
      // .attr("x2", 405)
      .attr("x", 410)
      .text("Recission in \n the United States of America");

    // linesvg.append("line")
    //   .attr("y1", 50)
    //   .attr("y2", 490)
    //   .attr("x2", 451)
    //   .attr("x1", 451)
    //   .style("stroke-width", 2)
    //   .style("fill", "none")

    // linesvg.append("text")
    //   .attr("y", 200)
    //   // .attr("y2", 510)
    //   // .attr("x2", 405)
    //   .attr("x", 460)
    //   .text("Recission in \n the United States of America");
    
    // Initialize line with group a
    var line = linesvg
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
      var dataFilter = data.filter(function(d){return d.primary_sectors==selectedGroup})

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
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })

    update(allGroup[0])
});
