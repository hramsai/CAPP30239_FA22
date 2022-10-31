let height = 400,
    width = 600,
    margin = ({ top: 25, right: 30, bottom: 35, left: 40 });
  
const svg = d3.select("#chart")
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('penguins.csv').then(data => {
  
  let x = d3.scaleLinear()
    .domain(d3.extent(data, d => d.body_mass_g)).nice()
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.flipper_length_mm)).nice() // extent gives us the minimum and maximum
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickFormat(d => (d/1000) + "kg").tickSize(-height + margin.top + margin.bottom)) // this is used to make the grids 
    // we are formatting the variables in kilograms as opposed to g (note: that we have to make the manipulations)
     
  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))  // this is used to make the grids 

  svg.append("g")
    .attr("fill", "black")
    .selectAll("circle") // selecting the kinds of options 
    // look up 'd3.symbols' might have to declare before we use. 
    .data(data)
    .join("circle") // joining with the data
    .attr("cx", d => x(d.body_mass_g))
    .attr("cy", d => y(d.flipper_length_mm))
    .attr("r", 2)
    .attr("opacity", 0.75);

  const tooltip = d3.select("body").append("div") // selecting the body tag, and then to that body tag append a new div
    .attr("class", "svg-tooltip") 
    .style("position", "absolute") // now add these two tags 
    .style("visibility", "hidden"); // now add these two tags 

  d3.selectAll("circle")
    .on("mouseover", function(event, d) { // mouse howering on the circle 
      d3.select(this).attr("fill", "red");
      tooltip
        .style("visibility", "visible")
        .html(`Species: ${d.species}<br />Island: ${d.island}<br />Weight: ${d.body_mass_g/1000}kg`);
    })
    .on("mousemove", function(event) {
      tooltip
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() { // mouse leaving the circle 
      d3.select(this).attr("fill", "black");
      tooltip.style("visibility", "hidden");
    })
    
});