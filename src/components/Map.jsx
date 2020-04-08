import React from "react";
import ReactMapboxGl from "react-mapbox-gl";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmVsaXhtYXlyIiwiYSI6ImNrNXd0amFhdzBwZjQzbGxiM3R4MGZlNzMifQ.rIemWdlB7VZpv19AZDWKTQ",
  dragRotate: false,
});

const Map = () => (
  <Mapbox
    center={[12.1692, 47.5827]}
    zoom={[13]}
    style="mapbox://styles/felixmayr/ck4h2kv441spq1co7x7hh17g0"
    containerStyle={{
      height: "100vh",
      width: "100vw",
    }}
  />
);

export default Map;
