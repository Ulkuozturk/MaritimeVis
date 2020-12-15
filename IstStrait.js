var widthStrait = 500
var heightStrait = 300

var svgStrait = d3.select("#IstStrait").append("svg")
            .attr("height", heightStrait)
            .attr("width", widthStrait)

const renderIstStrait = data => {

    const xValue = d => d.Ship_Number;
    const yValue = d => d.Total_Gross_Ton;
    const margin = {top:40, right:100, bottom:70, left:90}
    const radi = 4;
    const xAxisLabel= "Ship Number";
    const yAxisLabel= "Total Gross Ton";
    const title = "Istanbul Strait Ship Passage Number"


    const innerWidth = widthStrait - margin.right - margin.left;
    const innerHeight = heightStrait - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data,xValue))
        .range([0,innerWidth])
        .nice();
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data,yValue))
        .range([innerHeight,0])
        .nice();

    const g = svgStrait.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    
    const yAxisTickFormat = number => 
    d3.format(".0e")(number);  // d3.format(".3s")'ı modifiye ettik G yerine B koyduk.!!!

    const xAxisTickFormat = number => 
    d3.format(".3s")(number);  // d3.format(".3s")'ı modifiye ettik G yerine B koyduk.!!!
    
    const xAxis = d3.axisBottom(xScale)
                .tickSize(-innerHeight);

    const yAxis = d3.axisLeft(yScale).tickFormat(yAxisTickFormat).tickSize(-innerWidth);
    ;

    

    yAxisG = g.append("g").call(yAxis);

    yAxisG.select(".domain").remove();   

    const xAxisG = g.append("g").call(xAxis)
        .attr("transform", `translate(0, ${innerHeight})`)
        .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    xAxisG.select(".domain").remove(); 
    
    svgStrait.append("text")
        .attr("class", "axis-label")
        .attr("y", 290)
        .attr("x", innerWidth/2+50)
        .attr("fill", "black")  
        .text(xAxisLabel);

    yAxisG.append("text")
    .attr("class", "axis-label")        
    .attr("y", -40)
    .attr("x", -90)
    .attr("text-anchor","middle")
    .attr("fill", "black")
    .attr("transform", `rotate(-90)`)   
    .text(yAxisLabel);
    

    svgStrait.append("text")
        .attr("class", "title")
        .attr("y", 15)
        .attr("x", innerWidth/2)
        .text(title)

    g.selectAll('circle').data(data)
    .enter().append("circle")
    .attr("cx", d => xScale(xValue(d)))
    .attr("cy", d => yScale(yValue(d)))      // Burdada boy 0 iken y indexini 200 yaptı ve en aşağı indi.
    .attr("r", radi)      // Burdada boy 0 iken y indexini 200 yaptı ve en aşağı indi.

    // başlasın. Boyu da sıfır olacağı için, artık 200 bize göre
  }                                                       // innerHeight-200 yaptık bitti.


  d3.csv("https://raw.githubusercontent.com/Ulkuozturk/MaritimeVis/main/ShipPassages.csv").then(Data => {
    Data.forEach(d => {
        d.Ship_Number = +d.Ship_Number; 
    })
    renderIstStrait(Data);

  })

