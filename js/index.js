mapboxgl.accessToken = 'pk.eyJ1IjoiZmVsaXhtYXlyIiwiYSI6ImNrNXd0amFhdzBwZjQzbGxiM3R4MGZlNzMifQ.rIemWdlB7VZpv19AZDWKTQ';

document.addEventListener("DOMContentLoaded", () => {
    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/felixmayr/ck4h2kv441spq1co7x7hh17g0', //hosted style id
        center: [12.1692, 47.5827], // starting position
        zoom: 13 // starting zoom
    });
});
