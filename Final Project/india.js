const tooltip = d3.select("body")
  .append("div")
  .attr("class", "svg-tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden");

const height = 610,
  width = 975;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

Promise.all([
    d3.csv("Data/Literacy Data 2011.csv"),
    d3.json("Libs/IND_adm2_Literacy.json")
]).then(([data, ind]) => {
  const dataById = {};

  for (let d of data) {
    d.Literacy = +d.Literacy;
    dataById[d.District] = d;
  }

  console.log(dataById)

  const districts = topojson.feature(ind, ind.objects.IND_adm2);

  console.log(districts)

  // Quantize evenly breakups domain into range buckets
  const color = d3.scaleQuantize()
    .domain([0, 100]).nice()
    .range(d3.schemeBlues[9]);

  const path = d3.geoPath();

  d3.select("#legend")
    .node()
    .appendChild(
      Legend(
        d3.scaleOrdinal(
          ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%+"],
          d3.schemeBlues[9]
        ),
        { title: "Literacy rate (%)" }
      ));

  svg.append("g")
    .selectAll("path")
    .data(districts.features)
    .join("path")
    .attr("fill", d => (d.District in dataById) ? color(dataById[d.District].Literacy) : '#ccc')
    .attr("d", path)
    .on("mousemove", function (event, d) {
      let info = dataById[d.District];
      console.log(info)
      tooltip
        .style("visibility", "visible")
        .html(`${info.District}<br>${info.Literacy}%`)
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
      d3.select(this).attr("fill", "goldenrod");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("fill", d => (d.District in dataById) ? color(dataById[d.id].Literacy) : '#ccc');
    });
});