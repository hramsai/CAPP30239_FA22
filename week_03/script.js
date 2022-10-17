d3.csv("covid.csv").then(data => {

    for(let d of data){
        d.cases = +d.cases; // force a nunmber
    };

    console.log(data);

    const height = 600,
          width = 800,
          margin = ({top: 25, right: 30, bottom: 35, left: 50});
    
    let svg = d3.select("#chart")
        .append("svg")
        .attr("viewBox", [0, 0, width, height]);

    
    let x = d3.scaleBand()
        .domain(data.map(d => d.country))
        .range([margin.left, width - margin.right])
        .padding(0.1);

        // Scales:
        // it gives us the limits of our viz
        // it has a domain, and it can be a continous, or ordinal value

    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.cases)]).nice() // data, numbers and values // its an array -- so it goes fro 0 to the maximum value
        .range([height - margin.bottom, margin.top]); // space that it takes up

    const xAxis = g => g // this is short hand notation for 'func(g) return {g}'
        .attr("transform", `translate(0, ${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x)); // d3 in built function that builds are y axis
    
    const yAxis = g => g // this is short hand notation for 'func(g) return {g}'
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y).tickSizeOuter(0)); // d3 in built function that builds are y axis

    svg.append("g") // this is the group variable
        .call(xAxis); // this is the contents of the group

    svg.append("g")
        .call(yAxis); 

    let bar = svg.selectAll(".bar")
        .append("g") // its appending a group
        .data(data)
        .join("g")
        .attr("class", "bar"); // in the last two line we are doing a data join

    bar.append("rect") // taking bar and adding or appending a rectangle
        .attr("fill", "steelblue")
        .attr("x", d => x(d.country))
        .attr("width", x.bandwidth()) // it is particular to the x scale -- it is the scale band
        .attr("y", d => y(d.cases)) // postiion
        .attr("height", d => y(0) - y(d.cases)); // this is the height of the bar
})

