// Office Hours Questions:

// 1. Addtion of a legend
// 2. My aim is to try and make the map itself bigger, if that is possible. I tried playing around with the scale and the dimensions, but nothing seemed to fit. 
// 3. I've made a click function. The aim is to display the amount of money invested in each country. (line 94/95). But, it doesn't reach my data in the string. 


// The svg
var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");
  // height = 300,
  // width = 600; // https://www.d3indepth.com/geographic/

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(90)
  .center([0,50])
  .translate([width / 2, height / 2]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  // .domain([0, 10]).nice()
  .range(d3.schemeBlues[7]);

// Load external data and boot
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "Data/investment_country.csv", function(d) { data.set(d.recipients_iso3, +d.total_commitments, d.recipients); })
  .await(ready);

//   names = [...new Set(recipients)]

console.log(data)

function ready(error, topo) {

  let mouseOver = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "white")
  }

  let mouseLeave = function(d) {
    d3.selectAll(".Country")
      .transition()
      .duration(200)
      .style("opacity", .8)
    d3.select(this)
      .transition()
      .duration(200)
      .style("stroke", "transparent")
  }

//   let click = function(e, d) {
//     let str = `${d.recipients.index} received ${d.total_commitments.toLocaleString()} USD`;
//     d3.select("h2")
//         .html(str);
//   }

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      })
      .style("stroke", "transparent")
      .attr("class", function(d){ return "Country" } )
      .style("opacity", .8)
      .on("mouseover", mouseOver )
      .on("mouseleave", mouseLeave )
    //   .on("click", click)
    //   .append("title")
    //   .text(d => `${names[d.recipients]} received ${d.total_commitments.toLocaleString()} USD`);

    .on("click", function(e, d) {
      let str = `${d.recipients_iso3} hello`;
      d3.select("h2")
        .html(str);

    })
    .append("title")
    .text(d => `${d.recipients_iso3} hello`);
    
    }