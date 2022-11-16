
// set the dimensions and margins of the graph
<<<<<<< Updated upstream
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 890 - margin.left - margin.right,
    height = 560 - margin.top - margin.bottom;
=======
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
>>>>>>> Stashed changes

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
<<<<<<< Updated upstream
d3.csv("data.csv", function(data) {
    console.log(data)
    
    var allGroup = d3.map(data, function(d){return(d.primary_sectors)}).keys() // List of groups 
=======
d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_connectedscatter.csv", function(data) {

    // List of groups (here I have one group per column)
    var allGroup = ["valueA", "valueB", "valueC"]
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.transaction_year; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(10).tickFormat(d3.timeFormat("%Y"))); // ?? dates are getting converted to 1969?
=======
    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([0,10])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
>>>>>>> Stashed changes

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,20])
      .range([ height, 0 ]);
    svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y)
      .tickSizeOuter(0)
      .tickFormat(d => d + ' Billion') // ?? how do I make this into like 1 million or billion? 
      );

    // Initialize line with group a
    var line = svg
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
<<<<<<< Updated upstream
          .x(function(d) { return x(d.transaction_year) })
          .y(function(d) { return y(+d.total_commitments) })
          // .curve(d3.curveNatural)
=======
          .x(function(d) { return x(+d.time) })
          .y(function(d) { return y(+d.valueA) })
>>>>>>> Stashed changes
        )
        .attr("stroke", function(d){ return myColor("valueA") })
        .style("stroke-width", 4)
        .style("fill", "none")

    // A function that update the chart
    function update(selectedGroup) {

      // Create new data with the selection?
<<<<<<< Updated upstream
      var dataFilter = data.filter(function(d){return d.primary_sectors==selectedGroup})
=======
      var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })
>>>>>>> Stashed changes

      // Give these new data to update line
      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
<<<<<<< Updated upstream
            .x(function(d) { return x(d.transaction_year) })
            .y(function(d) { return y(+d.total_commitments) })
            // .curve(d3.curveNatural)
=======
            .x(function(d) { return x(+d.time) })
            .y(function(d) { return y(+d.value) })
>>>>>>> Stashed changes
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

})
