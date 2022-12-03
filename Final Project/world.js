// Harish Ram Sai
// World Choropleth
// Viz # 3

// Things to do:
// 1. Add Mouseover!
// 2. The title updates for all h2 in the document

(function() {

const height = 610,
width = 975;

const svg = d3.select("#my_dataviz")
.append("svg")
.attr("viewBox", [0, 0, width, height]);

const f = d3.format("$.2s");

Promise.all([
d3.csv("Data/investment_country.csv"),
d3.json("Libs/countries-110m.json")
]).then(([data, world]) => {

const dataById = {};

for (let d of data) {
  d.total_commitments = +d.total_commitments;
  dataById[d.recipients] = d;
}

console.log("hello", dataById)

let colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  // .domain([0, 10]).nice()
  .range(d3.schemePurples[9]);

const countries = topojson.feature(world, world.objects.countries);
const mesh = topojson.mesh(world, world.objects.countries);
const projection = d3.geoMercator()
  .fitSize([width, height], mesh);

projection.clipExtent([[0,0], [800, 500]])
const path = d3.geoPath().projection(projection);

svg.append("g")
  .selectAll("path")
  .data(countries.features)
  .join("path")
  .style("stroke", "white")
  .attr("stroke", "#999")
  .attr("fill", d => (d.properties.name in dataById) ? colorScale(dataById[d.properties.name].total_commitments) : '#ccc')
  .attr("d", path)
  .on("click", function (e, d) {
    let str = (d.properties.name in dataById) ? `In total, the World Bank spent ${f(dataById[d.properties.name].total_commitments).replace(/G/, "B")} USD in ${d.properties.name} from 2004 to 2014` : "";
    d3.select("h3").html(str); // assign an id and then add in HTML
  })
  .append("title")
  .text(d => (d.properties.name in dataById) ? `In total, the World Bank spent ${f(dataById[d.properties.name].total_commitments).replace(/G/, "B")} USD in ${d.properties.name} from 2004 to 2014` : "");
  

d3.select("#world_legend")
.node()
.appendChild(
  Legend(
    d3.scaleOrdinal(
      ["1", "2", "3", "4", "5", "6", "7", "8", "9+"],
      d3.schemePurples[9]
    ),
    { title: "Amount of Money Spent" }
  ));

});

})();