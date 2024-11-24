// Initialize map
const map = L.map('map').setView([47.685704, 	17.634079], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a><p>Love, DIGNITAS</p>'
}).addTo(map);

let loc = [47.685704, 17.634079];

// add location determination later

const iconOpen90 = L.icon({
    iconUrl: "/assets/vectors/pin.svg",
    iconSize: [28.239, 33.333],
    iconAnchor: [14.119, 33.333],
    popupAnchor: [0, -40],
    shadowUrl: '/assets/vectors/pin-shadow.svg',
    shadowSize: [40.2, 46.4],
    shadowAnchor: [20.1, 38]
});

const markers = L.markerClusterGroup({
    showCoverageOnHover: true,
    spiderfyOnMaxZoom: true,
    removeOutsideVisibleBounds: true,
});

// Function to add restroom markers
function addRestroom(lat, long, name, desc, openInfo, id) {
    markers.addLayer(L.marker([lat, long], {icon: iconOpen90}).addTo(map).on('click', e => e.target
        .bindPopup(`<p><b>${name}</b></p><p>${desc}</p><p>${openInfo}</p><button onclick="window.location.href='/code?id=${id}'">Tovább a belépéshez</button>`)));
}

// Add markers to map
map.addLayer(markers);

// Fetch and load establishments
async function loadEstablishments() {
    try {
        const response = await fetch('/api/establishments');
        const establishments = await response.json();

        establishments.forEach(place => {
            addRestroom(place.latitude, place.longitude, place.name, place.desc, isOpen(place.opensTime, place.closesTime, "text"), place.$id);
        });
    } catch (error) {
        console.error('Error loading establishments:', error);
    }
}

function timeFormat(time) {
    const data = [Math.floor(time / 100), time % 100];
    let processed = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i] < 10) {
                processed[i] = `0${data[i]}`;
            } else {
                processed[i] = data[i];
        }
    }

    return `${processed[0]}:${processed[1]}`;
}

function isOpen(opening, closing, type) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    let currentDay = now.getDay() - 1;
    if (currentDay == -1) {
        currentDay = 6;
    }
    let tomorrow = currentDay + 1;
    let yesterday = currentDay - 1;
    if (currentDay == 6) {
        tomorrow = 0;
    }
    if (currentDay == 0) {
        yesterday = 6;
    }

    const currentTime = currentHour * 100 + currentMinute;
    let openDuringNight = false;    

    if (opening[currentDay] > closing[currentDay] && closing[currentDay] !== 0) {
        openDuringNight = true;
    }

    let returnText = '';
    let returnBoolean = false;

    if (openDuringNight == false) {
        // ha nyitva van
        if (opening[currentDay] <= currentTime && (closing[currentDay] >= currentTime || closing[currentDay] == 0)) {
            returnText = `Nyitva ma ${timeFormat(closing[currentDay])}-ig.`;
            returnBoolean = true;
        }
        //ha ma meg nem nyitott ki
        else if (opening[currentDay] > currentTime) {
            returnText = `Zárva. Ma ${timeFormat(opening[currentDay])}-kor nyit ki.`;
            returnBoolean = false;
        }
        //ha ma mar bezárt
        else {
            returnText = `Zárva. Legközelebb ${timeFormat(opening[tomorrow])}-kor nyit ki.`;
            returnBoolean = false;
        }
    }

    if (openDuringNight == true) {
        if (opening[currentDay] <= currentTime || currentTime <= closing[yesterday]) {
            returnText = `Nyitva ${timeFormat(closing[currentDay])}-ig.`;
            returnBoolean = true;
        }
        else {
            returnText = `Zárva. Legközelebb ${timeFormat(opening[currentDay])}-kor nyit ki.`;
            returnBoolean = false;
        }
    }

    if (type == 'text') {
        return returnText;
    }
    else if (type == 'boolean') {
        return returnBoolean;
    }

}

function iconChooser(boolean, probability) {
    if (boolean == false) {
        return iconClosed;
    }
    else if (probability >= 0.8) {
        return iconOpen90;
    }
    else if (probability >= 0.6) {
        return iconOpen60;
    }
    else if (probability >= 0.4) {
        return iconOpen40;
    }
    else if (probability >= 0.2) {
        return iconOpen20;
    }
    else {
        return iconOpen0;
    }
}



loadEstablishments();
