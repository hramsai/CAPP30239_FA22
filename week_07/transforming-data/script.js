/* Bar chart totals by gender */
// function reusabiilty 

d3.json("a3cleanedonly2015.json").then(data => {
  // Always start by console.logging the data
  console.log("Raw data", data);

  // Create a array of count by gender
  let genderData = [
    { gender: "Male", count: 0 },
    { gender: "Female", count: 0 },
    { gender: "Other", count: 0 },
  ]; // brute way of building objects and arrays, and populating it

  // Create array of count by race (excluding "")
  // Population data in percent from US Census 2020
  let raceData = [
    { race: "Asian", count: 0, populationPercent: 0.061 },
    { race: "Black", count: 0, populationPercent: 0.136 },
    { race: "Hispanic", count: 0, populationPercent: 0.189 },
    { race: "Native", count: 0, populationPercent: 0.016 },
    { race: "Other", count: 0, populationPercent: 0.029 },
    { race: "White", count: 0, populationPercent: 0.593 },
  ];

  // Create empty array for month data
  // We will populate the values in the loop below
  let monthData = []; // start with an empty array
  let dataLength = data.length;

  for (let d of data) {
    // Count gender, populate genderData (8)
    if (d.Gender === "Male") {
      genderData[0].count += 1;
    } else if (d.Gender === "Female") {
      genderData[1].count += 1;
    } else {
      genderData[2].count += 1;
    } // here we are looping through each row of our data // arrays have positions that never change
    // onjects change positions all the time in the data (kind of like dictionary)

    // Count race, if race is noted
    if (d["Race"] !== "") {
      let nd = raceData.find(nd => nd.race == d["Race"]);
      nd.count += 1;
    } else {
      dataLength = dataLength - 1;
    }

    // Count by month (assumes only one year of data)
    let date = d3.timeParse("%x")(d.Date);
    let i = date.getMonth();

    if(!(i in monthData)) { // if i is not in the month
      monthData[i] = {
        // month: date.toLocaleString('default', { month: 'long' }),
        month: d3.timeParse("%Y-%m")(date.toISOString().substr(0, 7)),
        count: 0 // create a new object which has a month and a count
      };
    }

    monthData[i].count++; // for weapons (you'd have weapons here)
  };

  // Normalize race data for population percentage
  for (var d of raceData) {
    d.dataPercent = d.count / dataLength;
    d.ratio = 1 - (d.dataPercent / d.populationPercent);
  }

  console.log("Gender data", genderData);
  console.log("Race data", raceData);
  console.log("Month data", monthData);

  bar(genderData, "#genderChart", "gender", "count"); // giving the data, the ID, the counts
  bar(raceData, "#raceChart", "race", "count");
  line(monthData, "#monthChart", "month", "count", 60)
  
  let dc = DivergingBarChart(raceData, { // putting all the graphs together
    x: d => d.ratio,
    y: d => d.race,
    height: 400,
    colors: d3.schemeRdBu[3]
  })

  document.getElementById("divergingChart").appendChild(dc); // traversing the dom, instead of appending the files with D3

  let sourceHTML = `<p>Data Source: <a href="https://github.com/washingtonpost/data-police-shootings">Washington Post</a></p>`;
  d3.selectAll(".chart")
    .append("div")
    .html(sourceHTML);
});