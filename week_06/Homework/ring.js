d3.csv('Data/death.csv').then((data) => {
  const height = 500,
    width = 700,
    innerRadius = 125,
    outerRadius = 175,
    labelRadius = 200;

  const arcs = d3.pie().value(d => d.Counts)(data); // takes our data and buckets it 
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

  const svg = d3.select("#ring_chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("stroke-linejoin", "round")
    .selectAll("path")
    .data(arcs) // start of the data join
    .join("path") // joining on the data
    .attr("fill", (d, i) => d3.schemeCategory10[i])
    .attr("d", arc);

  svg.append("g")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
    .attr("transform", d => `translate(${arcLabel.centroid(d)})`) // something you can get when you use arcs -- it is the centre of the arc (for the 2015)
    .selectAll("tspan") // is a break in the line 
    .data(d => {
      return [d.data.Manner_of_death, d.data.Counts];
    })
    .join("tspan")
    .attr("x", 0)
    .attr("y", (d, i) => `${i * 1.1}em`)
    .attr("font-weight", (d, i) => i ? null : "bold")
    .text(d => d);

  svg.append("text")
    .attr("font-size", 30)
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("2015")
    .style("font-size", 20);
});