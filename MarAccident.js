var width = 480
var height = 300

var svg = d3.select("#MarAcc").append("svg")
            .attr("height", height)
            .attr("width", width)

const render = data => {

    const xValue = d => d.Year;
    const yValue = d => d.Maritime_Accident_Total;
    const margin = {top:20, right:20, bottom:45, left:100}

    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleBand()
        .domain(data.map(xValue))
        .range([0,innerWidth])
        .padding(0.2);
    
   


    const yScale = d3.scaleLinear()
        .domain([0,d3.max(data,yValue)])
        .range([innerHeight,0]);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
    
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale);

    g.append("g").call(yAxis);
    g.append("g").call(xAxis)
        .attr("transform", `translate(0, ${innerHeight})`)
        .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    g.append("text")
        .text("Look Out 2016!!!")
        .attr("fill", "black")
        .attr("transform", `translate(150,15)`)
        .attr("id","attention")
        .style("font-size","1em");

    g.selectAll('rect').data(data)
    .enter().append("rect")
    .attr("x", d => xScale(xValue(d)))
    .attr("y", d => yScale(yValue(d)))      // Burdada boy 0 iken y indexini 200 yaptı ve en aşağı indi.
    .attr("width", xScale.bandwidth() )
    .attr("height", d => innerHeight-yScale(yValue(d))) // Şöyle ki boy 0 iken onu 200'e scale ettik ki en aşağıda 
    .attr("stroke", "black");     
    
    console.log(data)// başlasın. Boyu da sıfır olacağı için, artık 200 bize göre
  }                                                       // innerHeight-200 yaptık bitti.


d3.json("https://raw.githubusercontent.com/Ulkuozturk/MaritimeVis/main/MarAccdata.csv").then(Data => {
  Data.forEach(d => {
      d.Maritime_Accident_Total = +d.Maritime_Accident_Total; 
  })
render(Data);
})

