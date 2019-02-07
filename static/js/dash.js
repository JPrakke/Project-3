console.log("script initializing.sasa..");
const buildGauge = year => {
  if (year >= 2005){
    d3.json(`/api/v1.0/happiness/${year}`).then((d) => {
      console.log(d);
      let level = parseFloat(d) * 20;
      console.log(`is ${level}`);
      let degrees = 180 - level;
      const radius = 0.5;
      let radians = (degrees * Math.PI) / 180;
      let x = radius * Math.cos(radians);
      let y = radius * Math.sin(radians);
  
      const mainPath = "M -.0 -0.05 L .0 0.05 L ";
      let pathX = String(x);
      let space = " ";
      let pathY = String(y);
      const pathEnd = " Z";
      let path = mainPath.concat(pathX, space, pathY, pathEnd);
  
      let data = [
          {
              type: "scatter",
              x: [0],
              y: [0],
              marker: { size: 12, color: "850000" },
              showlegend: false,
              name: "Freq",
              text: level,
              hoverinfo: "text+name"
          },
          {
          values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
          rotation: 90,
          text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
          textinfo: "text",
          textposition: "inside",
          marker: {
              colors: [
              "rgba(0, 105, 11, .5)",
              "rgba(10, 120, 22, .5)",
              "rgba(14, 127, 0, .5)",
              "rgba(110, 154, 22, .5)",
              "rgba(170, 202, 42, .5)",
              "rgba(202, 209, 95, .5)",
              "rgba(210, 206, 145, .5)",
              "rgba(232, 226, 202, .5)",
              "rgba(240, 230, 215, .5)",
              "rgba(255, 255, 255, 0)"
              ]
          },
          labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
          hoverinfo: "label",
          hole: 0.5,
          type: "pie",
          showlegend: false
          }
      ];
      let layout ={
          shapes: [
              {
                type: "path",
                path: path,
                fillcolor: "850000",
                line: {
                  color: "850000"
                }
              }
            ],
            title: "<b>World Happiness</b> <br> Average Per Year",
            height: 500,
            width: 500,
            xaxis: {
              zeroline: false,
              showticklabels: false,
              showgrid: false,
              range: [-1, 1]
            },
            yaxis: {
              zeroline: false,
              showticklabels: false,
              showgrid: false,
              range: [-1, 1]
            }
      };
      const GAUGE = document.getElementById("gauge");
      Plotly.newPlot(GAUGE, data, layout);
    });
  }
};

// need to look into loop implementation
const buildMetadata = year => {
  d3.json(`/api/v1.0/global_terror/metadata/${year}`).then((data) => {
    const PANEL = d3.select("#year-metadata");
    PANEL.html("");
    
    let ts2 = Object.values(data)
    let tReports= (ts2[0]["Total Reports"])
    let atkType= (ts2[0]["attacktype1_txt"])
    let tKReports = (ts2[1]["Total Reports"])
    let weapType = (ts2[1]["weaptype1_txt"])
    let totAttacks = (ts2[2]["Attacks"])
    let totFatal = (ts2[3]["Kills"])
    let totWound = (ts2[4]["Wounded"])


    PANEL.append("h6").html(`Top Attack Type:<br>${atkType} Reported ${tReports} times <hr class="table">`)
    PANEL.append("h6").html(`Top Weapon Type:<br>${weapType} Reported ${tKReports} times <hr class="table">`)
    PANEL.append("h6").html(`Total Attacks: ${totAttacks}`)
    PANEL.append("h6").html(`Total Fatalities: ${totFatal}`)
    PANEL.append("h6").html(`Total Wounded: ${totWound}`)
  })
}     


function init() {
    console.log("something?");
  // Grab a reference to the dropdown select element
  const selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/years").then((data) => {
   
    data.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    
    // Use the first sample from the list to build the initial plots
    let firstYear = data[0];
    makeAssets(firstYear, Firearms);
    // buildGauge(firstYear)
    buildMetadata(firstYear);
  });
}
function optionChanged(newYear) {
    d3.select("gauge").html("");  
  // Fetch new data each time a new sample is selected
    // buildCharts(newYear);
    buildMetadata(newYear);
    // buildGauge(newYear)
    makeAssets(newYear, Firearms);
  }

init();