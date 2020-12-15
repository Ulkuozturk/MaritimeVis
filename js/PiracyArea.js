var widthPiracyArea = 900
var heightPiracyArea = 300

var svgPiracyArea = d3.select("#PiracyArea").append("svg")
            .attr("height", heightPiracyArea)
            .attr("width", widthPiracyArea)

const renderPiracyArea = data => {

    const xValue = d => d.Date;
    const yValue = d => d.Ship_Type;
    const margin = {top:40, right:100, bottom:70, left:90}
    const radi = 4;
    const xAxisLabel= "Date";
    const yAxisLabel= "Number of Piracy Activities";
    const title = "Monthly Piracy Activities in the World"


    const innerWidth = widthPiracy - margin.right - margin.left;
    const innerHeight = heightPiracy - margin.top - margin.bottom;

    const xScale = d3.scaleTime()
        .domain(d3.extent(data,xValue))
        .range([0,innerWidth])
        .nice();
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data,yValue))
        .range([innerHeight,0])
        .nice();

    const g = svgPiracyArea.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    
    //const yAxisTickFormat = number => 
    //d3.format(".0e")(number);  // d3.format(".3s")'ı modifiye ettik G yerine B koyduk.!!!

    //const xAxisTickFormat = number => 
    //d3.format(".3s")(number);  // d3.format(".3s")'ı modifiye ettik G yerine B koyduk.!!!
    
    const xAxis = d3.axisBottom(xScale)
                .tickSize(-innerHeight)
                .ticks(d3.timeMonth.every(6));

    const yAxis = d3.axisLeft(yScale).tickSize(-innerWidth);
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
    
    svgPiracyArea.append("text")
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
    

    svgPiracyArea.append("text")
        .attr("class", "title")
        .attr("y", 15)
        .attr("x", innerWidth/2)
        .text(title)


    const AreaGenerator = d3.area()
        .x(d => xScale(xValue(d)))
        .y0(innerHeight)
        .y1(d => yScale(yValue(d)))
        .curve(d3.curveBasis);

    g.append("path")
     .attr("class" , "line-path")
     .attr("d", AreaGenerator(data))
     .style("fill", "red")
     
     

   

    // başlasın. Boyu da sıfır olacağı için, artık 200 bize göre
  }                                                       // innerHeight-200 yaptık bitti.


  d3.csv("https://raw.githubusercontent.com/Ulkuozturk/MaritimeVis/main/Data/Montly_Piracy2.csv").then(Data => {
    Data.forEach(d => {
        
        d.Date= new Date(d.Date);
        d.Ship_Type = +d.Ship_Type; 
    })
    renderPiracyArea(Data);
    console.log(Data)
  })

