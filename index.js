let height = 500;
let width = 1000;
let svg = d3.select("#map")
            .append("svg")
            .attr("class","container-fluid")
            .attr("viewBox",[`0 0 ${width} ${height}`])
/*
 other projection
    d3.geoAzimuthalEqualArea()
    d3.geoAzimuthalEquidistant()
    d3.geoStereographic()
    d3.geoConicConformal()
    d3.geoConicEqualArea()
    d3.geoConicEquidistant()
*/
let projection = d3.geoNaturalEarth1()
let pathGenrator = d3.geoPath().projection(projection)
const tooltips    = d3.select("#map").append("div").attr("class","tooltips");
svg.append("path")
  .attr('class', 'sphere')
  .attr("d",pathGenrator({type:'Sphere'}))
d3.json("data.json").then(data=>{
    let country = topojson.feature(data,data.objects.countries)
    let map = country.features.map(d=>d.properties.name)
    let color = country.features.map(d=>d.properties.color)
    let id = country.features.map(d=>d.id)
    svg.selectAll("path")
      .data(country.features)
      .enter()
      .append("path")
      .attr("d",pathGenrator)
      .attr("class","country")
      .attr("fill",(d,i)=>color[i])
      .on("mouseover",function(d,i){
        tooltips.html("<div>"+map[i]+"</div>")
                .style("top",(d3.event.pageY - 33) + "px")
                .style("left",(d3.event.pageX - 40) + "px")
        d3.select(this)
           .style("stroke-width",3)
           .style("stroke","black")
           .style("stroke-opacity",0.7)
      })
      .on("mouseout",function(d,i){
        tooltips.html("")
        d3.select(this)
           .style("stroke-width",1)
           .style("stroke","black")
           .style("stroke-opacity",0.5)
      })
})
