var widthStraitLine = 500
var heightStraitLine = 300

var svgStraitLine = d3.select("#IstStraitLine").append("svg")
            .attr("height", heightStraitLine)
            .attr("width", widthStraitLine)

const renderStraitLine = data => {

    const xValue = d => d.Date;
    const yValue = d => d.Ship_Number;
    const y2Value = d => d.Total_Gross_Ton;
    const margin = {top:40, right:100, bottom:70, left:40}
    const radi = 4;
    const xAxisLabel= "Date";
    const yAxisLabel= "Number";
    const y2AxisLabel = "Total Ship Tonnage"
    const title = "Istanbul Strait Ship Number and Total Ship Tonnage"


    const innerWidth = widthStraitLine - margin.right - margin.left;
    const innerHeight = heightStraitLine - margin.top - margin.bottom;

    const xScale = d3.scaleTime()
        .domain(d3.extent(data,xValue))
        .range([0,innerWidth])
        .nice();
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data,yValue))
        .range([innerHeight,0])
        .nice();

    const y2Scale = d3.scaleLinear()
        .domain(d3.extent(data,y2Value))
        .range([innerHeight,0])
        .nice();

    const g = svgStraitLine.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    
    //const yAxisTickFormat = number => 
    //d3.format(".0e")(number);  // d3.format(".3s")'ı modifiye ettik G yerine B koyduk.!!!

    //const xAxisTickFormat = number => 
    //d3.format(".3s")(number);  // d3.format(".3s")'ı modifiye ettik G yerine B koyduk.!!!
    
    const xAxis = d3.axisBottom(xScale)
                .tickSize(-innerHeight)
                .ticks(d3.timeMonth.every(6));

    const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth);
    
    const y2AxisFormat = number => d3.format(".0e")(number);  // d3.format(".3s")'ı modifiye ettik G yerine B koyduk.!!!
    
    const y2Axis = d3.axisRight(y2Scale).tickFormat(y2AxisFormat);

    yAxisG = g.append("g").call(yAxis);
    y2AxisG = g.append("g")
                .attr("transform", `translate(${innerWidth},0)`)
                .call(y2Axis);

    

    yAxisG.select(".domain").remove();   
    y2AxisG.select(".domain").remove();   

    const xAxisG = g.append("g").call(xAxis)
        .attr("transform", `translate(0, ${innerHeight})`)
        .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    xAxisG.select(".domain").remove(); 
    
    svgStraitLine.append("text")
        .attr("class", "axis-label")
        .attr("y", 290)
        .attr("x", innerWidth/2+50)
        .attr("fill", "black")  
        .text(xAxisLabel);

    yAxisG.append("text")
    .attr("class", "axis-label")        
    .attr("y", -30)
    .attr("x", -90)
    .attr("text-anchor","middle")
    .attr("fill", "black")
    .attr("transform", `rotate(-90)`)   
    .text(yAxisLabel);

    y2AxisG.append("text")
    .attr("class", "axis-label")        
    .attr("y", 60)
    .attr("x", -90)
    .attr("text-anchor","middle")
    .attr("fill", "black")
    .attr("transform", `rotate(-90)`)   
    .text(y2AxisLabel);
    

    svgStraitLine.append("text")
        .attr("class", "title")
        .attr("y", 15)
        .attr("x", innerWidth/24)
        .text(title)


    const LineGenerator = d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(d3.curveBasis);
    
    const LineGenerator2 = d3.line()
        .x(d => xScale(xValue(d)))
        .y(d => y2Scale(y2Value(d)))
        .curve(d3.curveBasis);

    g.append("path")
     .attr("class" , "line-path")
     .attr("d", LineGenerator(data))

     g.append("path")
     .attr("class" , "line-path2")
     .attr("d", LineGenerator2(data))
     
    
    // başlasın. Boyu da sıfır olacağı için, artık 200 bize göre
  }                                                       // innerHeight-200 yaptık bitti.


  d3.csv("https://raw.githubusercontent.com/Ulkuozturk/MaritimeVis/main/Data/Ship_Passage.csv").then(Data => {
    Data.forEach(d => {
        
        d.Date= new Date(d.Date);
        d.Ship_Number = +d.Ship_Number; 
        d.Total_Gross_Ton = +d.Total_Gross_Ton; 

    })
    renderStraitLine(Data);
    console.log(Data)
  })

