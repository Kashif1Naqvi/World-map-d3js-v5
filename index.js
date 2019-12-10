let svg = d3.select("#map").append("svg").attr("height",600).attr("width",800).style("margin-top","80px")
let projection = d3.geoMercator()
let pathGenrator = d3.geoPath().projection(projection)
svg.append("path").attr('class', 'sphere').attr("d",pathGenrator({type:'Sphere'}))

d3.json("data.json").then(data=>{
    let country  = topojson.feature(data,data.objects.countries)
    svg.selectAll("path").data(country.features).enter().append("path").attr("d",pathGenrator)
})
