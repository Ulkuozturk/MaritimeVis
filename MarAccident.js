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

d3.csv("MarAccData.csv").then(data => {
    data.forEach(d => {
        d.Maritime_Accident_Total = +d.Maritime_Accident_Total;
    });
    render(data);
})