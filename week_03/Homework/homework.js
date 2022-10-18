/* Harish Ram Sai/
/* Homework 3 */
/* Creating a Bar Chart: Library Data */

d3.csv("library_visits_jan22.csv").then(data => {

    for (let d of data) {
        d.num = +d.num; //
    };

    const height = 500, // the height of the chart
          width = 800,
          margin = ({ top: 40, right: 30, bottom: 35, left: 50 });
          /* object with a property for each of the four sides (clockwise from the top) representing the respective margins in pixels. */

    let svg = d3.select("#chart") // D3 selection object encapsulates a set of DOM elements
        .append("svg") // .append() takes the selection and adds a svg container to it, which allows for visualization.
        .attr("viewBox", [0, 0, width, height]); // for resizing element in browser
    
    let x = d3.scaleBand()
        .domain(data.map(d => d.branch)) // data that is on the x axis, returns array (in this case, the variable 'branch')
        .range([margin.left, width - margin.right]) // the chart’s width in pixels
        .padding(0.1); // the empty space between the axis and the edges of the figure
    
    let y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.num)]).nice() // nice rounds the top num
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
        .attr("x", d => x(d.branch)) // x position attribute
        .attr("width", x.bandwidth()) // this width is the width attr on the element
        .attr("y", d => y(d.num)) // y position attribute
        .attr("height", d => y(0) - y(d.num)); // this height is the height attr on element
    
    bar.append("text") // add labels to the axis bands (with tick marks)
        .text(d => d.num)
        .attr("x", d => x(d.branch) + (x.bandwidth()/2))
        .attr("y", d => y(d.num) + 15)
        .attr("text-anchor", "middle")
        .style("fill", "white");

    bar.append("text") // adding a title to the bar chart
        .attr("x", width/2)
        .attr("y", height - 450)
        .attr("text-anchor", "middle")
        .style("font-size", "16px") // varies the font size
        .text("Library Visits in Chicago (January '22)");

    bar.append("text") // add labels to define the X axis
        .attr("class", "x label")
        .attr("text-anchor", "middle")
        .attr("x", width - width/2)
        .attr("y", height)
        .text("Branches")
        .style('fill', 'black')
        .style("font-size", "14px"); // varies the font size

});