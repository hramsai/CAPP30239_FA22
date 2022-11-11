/* Harish Ram Sai/
/* Homework 4 */
/* Creating a Bar Chart: Library Data */

d3.csv("Data/Races_Data.csv").then(data => {

    for (let d of data) {
        d.Proportions = +d.Proportions; //
    };

    const height = 500, // the height of the chart
          width = 800,
          margin = ({ top: 40, right: 30, bottom: 35, left: 50 });
          /* object with a property for each of the four sides (clockwise from the top) representing the respective margins in pixels. */

    let svg = d3.select("#bar_chart") // D3 selection object encapsulates a set of DOM elements
        .append("svg") // .append() takes the selection and adds a svg container to it, which allows for visualization.
        .attr("viewBox", [0, 0, width, height]); // for resizing element in browser
    
    let x = d3.scaleBand()
        .domain(data.map(d => d.Race)) // data that is on the x axis, returns array (in this case, the variable 'branch')
        .range([margin.left, width - margin.right]) // the chart’s width in pixels
        .padding(0.1); // the empty space between the axis and the edges of the figure
    
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Proportions)]).nice() // nice rounds the top num
        .range([height - margin.bottom, margin.top]); //svgs are built from top down, so this is reversed
    
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`) // move location of axis
        .call(d3.axisBottom(x)); // for X axis
    
    svg.append("g")
        .attr("transform", `translate(${margin.left - 5},0)`)
        .call(d3.axisLeft(y)); // for Y axis

    let bar = svg.selectAll(".bar") // create bar groups
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect") // add rect to bar group
        .attr("fill", "grey")
        .attr("x", d => x(d.Race)) // x position attribute
        .attr("width", x.bandwidth()) // this width is the width attr on the element
        .attr("y", d => y(d.Proportions)) // y position attribute
        .attr("height", d => y(0) - y(d.Proportions)); // this height is the height attr on element
    
    bar.append("text") // add labels to the bars
        .text(d => d.Proportions + '%')
        .attr("x", d => x(d.Race) + (x.bandwidth()/2))
        .attr("y", d => y(d.Proportions) - 10)
        .attr("text-anchor", "middle")
        .style("fill", "black");

    bar.append("text") // adding a title to the bar chart
        .attr("x", width/2)
        .attr("y", height - 450)
        .attr("text-anchor", "middle")
        .style("font-size", "16px") // varies the font size
        .text("Racial Distribution of Killings");

    bar.append("text") // add labels to define the X axis
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", width - width/2)
        .attr("y", height)
        .text("Races")
        .style('fill', 'black')
        .style("font-size", "8px"); // varies the font size

});