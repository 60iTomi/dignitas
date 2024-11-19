var map = L.map('map').setView([47.4932055, 19.0527219], 16);



L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a><p>Love, DIGNITAS</p>'
}).addTo(map);


var myIcon = L.icon({
    iconUrl: "/assets/vectors/pin.svg",
    iconSize: [28.239,33.333],
    iconAnchor: [14.119, 33.333],
    popupAnchor: [0, -40],
    shadowUrl: '/assets/vectors/pin-shadow.svg',
    shadowSize: [40.2,46.4],
    shadowAnchor: [20.1, 38]
});

var marker = L.marker([47.4932055, 19.0527219], {icon: myIcon}).addTo(map);
marker.bindPopup("<b>KFC, Váci utca</b><br>It's a KFC, what else do you need to know?<br><button>Tovább a belépéshez</button>").openPopup();
