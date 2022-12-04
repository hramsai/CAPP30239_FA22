// Harish Ram Sai
// Amount Spent by Sector - Line Chart
// Viz # 2

// Things to do:
// Adding numbers on the charts

// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 850 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const barsvg = d3.select("#my_barviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
let x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
let xAxis = barsvg.append("g")
  .attr("transform", "translate(0," + height + ")")

// Initialize the Y axis
let y = d3.scaleLinear()
  .range([ height, 0]);
let yAxis = barsvg.append("g")
  .attr("class", "myYaxis")

barsvg.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", width/2)
  .attr("y", height + 30)
  .text("Years");

barsvg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("y", -35)
  .attr("x", 0)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("Number of Interventions");

// A function that create / update the plot for a given variable:
function update(selectedVars) {

  // Parse the Data
  d3.csv("Data/sector_year_counts.csv").then(data => {

    // X axis
    x.domain(data.map(function(d) { return d.transaction_year; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x))

    // Add Y axis
    y.domain([0, d3.max(data, function(d) { return +d[selectedVars] }) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // variable u: map data to existing bars
    let u = barsvg.selectAll("rect")
      .data(data)

    // update bars
    u
      .enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
        .attr("x", function(d) { return x(d.transaction_year); })
        .attr("y", function(d) { return y(d[selectedVars]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[selectedVars]); })
        .attr("fill", "#69b3a2")

  })

}

// Initialize plot
update('Agriculture, forestry, fishing')
