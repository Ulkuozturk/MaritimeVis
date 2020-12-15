var widthAccident = 500
var heightAccident = 300

var svg = d3.select("#MarAcc").append("svg")
            .attr("height", heightAccident)
            .attr("width", widthAccident)

const render = data => {

    const xValue = d => d.Year;
    const yValue = d => d.Maritime_Accident_Total;
    const margin = {top:40, right:40, bottom:45, left:65}

    const innerWidth = widthAccident - margin.right - margin.left;
    const innerHeight = heightAccident - margin.top - margin.bottom;

    const title = "Number of Maritime Accidents in Turkey";

    const color = d3.scaleLinear()
                    .domain(d3.extent(data,yValue))
                    .range(["#EDCEBC","#712422"]);

    const xScale = d3.scaleBand()
        .domain(data.map(xValue))
        .range([0,innerWidth])
        .padding(0.2);    
   


    const yScale = d3.scaleLinear()
        .domain([0,d3.max(data,yValue)])
        .range([innerHeight,0])
        .nice();

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
    
    const xAxis = d3.axisBottom(xScale)

    const yAxis = d3.axisLeft(yScale)
                .tickSize(-innerWidth);

    g.append("g").call(yAxis);
    g.append("g").call(xAxis)
        .attr("transform", `translate(0, ${innerHeight})`)
        .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    svg.append("text")
        .attr("class", "title")
        .attr("y", 15)
        .attr("x", innerWidth/2-70)
        .text(title)
    

    g.selectAll('rect').data(data)
    .enter().append("rect")
    .attr("x", d => xScale(xValue(d)))
    .attr("y", d => yScale(yValue(d)))      // Burdada boy 0 iken y indexini 200 yaptı ve en aşağı indi.
    .attr("width", xScale.bandwidth() )
    .attr("height", d => innerHeight-yScale(yValue(d))) // Şöyle ki boy 0 iken onu 200'e scale ettik ki en aşağıda 
    .attr("stroke", "black")
    .attr("fill", d => color(yValue(d)));     
    
   // başlasın. Boyu da sıfır olacağı için, artık 200 bize göre
  }                                                       // innerHeight-200 yaptık bitti.


d3.json("https://raw.githubusercontent.com/Ulkuozturk/MaritimeVis/main/MarAccdata.csv").then(Data => {
  Data.forEach(d => {
      d.Maritime_Accident_Total = +d.Maritime_Accident_Total; 
  })
render(Data);
})

