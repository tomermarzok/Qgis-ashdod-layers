
function roadsInParks(feature){
    return {
        fillColor:'blue',
        weight:2,
        opacity:0.7,
        color:'blue',
        dashArry:3,
        fillOpacity:0.7,
    }    
}
function roadsStyle(feture){
    return {    
        fillColor:'black',
        weight:2,
        opacity:0.7,
        color:'#aaaaaa',
        dashArry:3,
        fillOpacity:0.7,
    }
}

function parkStyle(){
    return {
        fillColor:'#61ff79',
        weight:2,
        opacity:1,
        //borders color
        color:'#0d9e00',
        dashArry:3,
        fillOpacity:0.7,
    }
}

function areaStyle(feture){
    return {

        //border weight
        weight:4,

        opacity:1,

        //border color
        color:'black',
        dashArry:3,
        //color fill opacity
        fillOpacity:0.02,
    }
}

// accsess token icon plugin
// L.MakiMarkers.accessToken = "pk.eyJ1IjoibGlkb3IwOCIsImEiOiJjamJnbWtlaTgwY2d4MndyMzVtYTEyYXc5In0.2fe77vAYJ6ElgeVFDwyGSw";
mapboxgl.accessToken ="pk.eyJ1IjoibGlkb3IwOCIsImEiOiJjamJnbWtlaTgwY2d4MndyMzVtYTEyYXc5In0.2fe77vAYJ6ElgeVFDwyGSw";
// initialize leaflet map 
let map = L.map('map').setView([31.797056835116557,34.6483039855957],7);


//set openStreet Map layer
var base1 =L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
// var base1 =L.mapboxgl.tileLayer('/v4/mapbox.dark/{z}/{x}/{y}{@2x}.png').addTo(map);
// var layer = L.mapboxgl.tileLayer('mapbox.dark').addTo(map);

var mapboxUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibGlkb3IwOCIsImEiOiJjamJnbWtlaTgwY2d4MndyMzVtYTEyYXc5In0.2fe77vAYJ6ElgeVFDwyGSw';
var accessToken ="pk.eyJ1IjoibGlkb3IwOCIsImEiOiJjamJnbWtlaTgwY2d4MndyMzVtYTEyYXc5In0.2fe77vAYJ6ElgeVFDwyGSw";

var darkBase = L.tileLayer(mapboxUrl, {id: 'mapbox.dark', attribution: '', maxZoom: 20, accessToken: accessToken});



//set map view to israel-ashdod location 
map.flyTo([ 31.797056835116557,34.6483039855957],13);


var roadsLayer = L.geoJSON(roads,{style: roadsStyle()});
var parkLayer = L.geoJSON(park,{style:parkStyle});
var roadsInParks = L.geoJSON(roadsInPark,{style:roadsInParks()})

L.geoJSON(park,{
        onEachFeature: function (feature, layer) {

      var bounds = layer.getBounds();   
      // Get center of bounds
      var center = bounds.getCenter();
      // Use center to put marker on map
      var marker = L.marker(center).bindPopup('<h1>'+feature.properties.code+'</h1><p>name: '+feature.properties.code+'</p>').addTo(parkLayer);
    }
    }
);

var areaLayer = L.geoJSON(area,{style:areaStyle});


var baseLayers= {
    'openStreet':base1,
    "dark":darkBase
}
var groupedOverlays = {
    "Layers": {
        "Roads": roadsLayer,
        "parks":parkLayer,
        "area":areaLayer,
        "roads in parks":roadsInParks,
        
    }
};

L.control.groupedLayers(baseLayers,groupedOverlays).addTo(map);

map.on('baselayerchange ', function(e) {
    if(e.name=='dark'){
        areaLayer.setStyle({color: "red"});
        
    }
    else{
        areaLayer.setStyle({color:'black'})
    }
});






map.fitBounds(areaLayer.getBounds());

