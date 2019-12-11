
let svg = d3.select("#map")
            .append("svg")
            .attr("viewBox",`0 0 ${1000} ${600}`)
            .style("margin-top","80px")

let projection = d3.geoNaturalEarth1()

let pathGenrator = d3.geoPath().projection(projection)
const tooltips    = d3.select("#map").append("div").attr("class","tooltips");
svg
  .append("path")
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
                .style("top",(d3.event.pageY - 70) + "px")
                .style("left",(d3.event.pageX - 90) + "px")
      })

})
