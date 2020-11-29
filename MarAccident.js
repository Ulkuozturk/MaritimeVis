var width = 500
var height = 300

var svg = d3.select("#MarAcc").append("svg")
            .attr("height", height)
            .attr("width", width)

const render = data => {

    const xValue = d => d.Maritime_Accident_Total;
    const yValue = d => d.Year;
    const margin = {top:20, right:20, bottom:20, left:100}
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain([0,d3.max(data,xValue)])
        .range([0,innerWidth]);
    


    const yScale = d3.scaleBand()
        .domain(data.map(yValue))
        .range([0,innerHeight])
        .padding(0.2);
    console.log(data);


    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
    
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    g.append("g").call(yAxis);
    g.append("g").call(xAxis)
        .attr("transform", `translate(0, ${innerHeight})`)



    g.selectAll('rect').data(data)
    .enter().append("rect")
    .attr("y", d => yScale(yValue(d)))
    .attr("width", d => xScale(xValue(d)))
    .attr("height", yScale.bandwidth())
    .attr("stroke", "white");
}



dataset=[
    {
      "Year": 2001,
      "Maritime_Accident_Total": 127,
      "Maritime_Acc_Number_Vessel": 142,
      "Maritime_Acc_Killed": 25,
      "Maritime_Acc_Injured": 5
    },
    {
      "Year": 2002,
      "Maritime_Accident_Total": 93,
      "Maritime_Acc_Number_Vessel": 105,
      "Maritime_Acc_Killed": 21,
      "Maritime_Acc_Injured": 2
    },
    {
      "Year": 2003,
      "Maritime_Accident_Total": 115,
      "Maritime_Acc_Number_Vessel": 130,
      "Maritime_Acc_Killed": 15,
      "Maritime_Acc_Injured": 4
    },
    {
      "Year": 2004,
      "Maritime_Accident_Total": 144,
      "Maritime_Acc_Number_Vessel": 166,
      "Maritime_Acc_Killed": 22,
      "Maritime_Acc_Injured": 4
    },
    {
      "Year": 2005,
      "Maritime_Accident_Total": 147,
      "Maritime_Acc_Number_Vessel": 176,
      "Maritime_Acc_Killed": 24,
      "Maritime_Acc_Injured": 0
    },
    {
      "Year": 2006,
      "Maritime_Accident_Total": 116,
      "Maritime_Acc_Number_Vessel": 137,
      "Maritime_Acc_Killed": 8,
      "Maritime_Acc_Injured": 0
    },
    {
      "Year": 2007,
      "Maritime_Accident_Total": 117,
      "Maritime_Acc_Number_Vessel": 146,
      "Maritime_Acc_Killed": 18,
      "Maritime_Acc_Injured": 3
    },
    {
      "Year": 2008,
      "Maritime_Accident_Total": 206,
      "Maritime_Acc_Number_Vessel": 257,
      "Maritime_Acc_Killed": 10,
      "Maritime_Acc_Injured": 8
    },
    {
      "Year": 2009,
      "Maritime_Accident_Total": 147,
      "Maritime_Acc_Number_Vessel": 185,
      "Maritime_Acc_Killed": 18,
      "Maritime_Acc_Injured": 4
    },
    {
      "Year": 2010,
      "Maritime_Accident_Total": 194,
      "Maritime_Acc_Number_Vessel": 232,
      "Maritime_Acc_Killed": 22,
      "Maritime_Acc_Injured": 49
    },
    {
      "Year": 2011,
      "Maritime_Accident_Total": 132,
      "Maritime_Acc_Number_Vessel": 161,
      "Maritime_Acc_Killed": 11,
      "Maritime_Acc_Injured": 28
    },
    {
      "Year": 2012,
      "Maritime_Accident_Total": 135,
      "Maritime_Acc_Number_Vessel": 158,
      "Maritime_Acc_Killed": 92,
      "Maritime_Acc_Injured": 10
    },
    {
      "Year": 2013,
      "Maritime_Accident_Total": 118,
      "Maritime_Acc_Number_Vessel": 140,
      "Maritime_Acc_Killed": 27,
      "Maritime_Acc_Injured": 47
    },
    {
      "Year": 2014,
      "Maritime_Accident_Total": 96,
      "Maritime_Acc_Number_Vessel": 107,
      "Maritime_Acc_Killed": 75,
      "Maritime_Acc_Injured": 42
    },
    {
      "Year": 2015,
      "Maritime_Accident_Total": 68,
      "Maritime_Acc_Number_Vessel": 76,
      "Maritime_Acc_Killed": 13,
      "Maritime_Acc_Injured": 37
    },
    {
      "Year": 2016,
      "Maritime_Accident_Total": 237,
      "Maritime_Acc_Number_Vessel": 268,
      "Maritime_Acc_Killed": 205,
      "Maritime_Acc_Injured": 1796
    },
    {
      "Year": 2017,
      "Maritime_Accident_Total": 117,
      "Maritime_Acc_Number_Vessel": 127,
      "Maritime_Acc_Killed": 15,
      "Maritime_Acc_Injured": 28
    },
    {
      "Year": 2018,
      "Maritime_Accident_Total": 83,
      "Maritime_Acc_Number_Vessel": 93,
      "Maritime_Acc_Killed": 14,
      "Maritime_Acc_Injured": 25
    }
  ]


fetchdata= data => {
    data.forEach(d => {
        d.Maritime_Accident_Total = +d.Maritime_Accident_Total;
    });
    render(data);
}

fetchdata(dataset)