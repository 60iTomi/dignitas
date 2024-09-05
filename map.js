var map = L.map('map').setView([51.505, -0.09], 13);



L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var myIcon = L.icon({
    iconUrl: "/assets/pin.png",
    iconSize: [30,30],
    iconAnchor: [13, 93],
    popupAnchor: [-3, -76],
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [0, 0],
    shadowAnchor: [22, 94]
});

var marker = L.marker([51.5, -0.09], {icon: myIcon}).addTo(map);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.");