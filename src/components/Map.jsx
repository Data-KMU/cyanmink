import React, { useEffect, useState } from "react";
import ReactMapboxGl from "react-mapbox-gl";

import Layer from "./Layer";

import testjson from "../json/test.json";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmVsaXhtYXlyIiwiYSI6ImNrNXd0amFhdzBwZjQzbGxiM3R4MGZlNzMifQ.rIemWdlB7VZpv19AZDWKTQ",
  dragRotate: false,
});

const Map = () => {
  const [zoom, setZoom] = useState(7);
  const [position, setPosition] = useState([12.1692, 47.5827]);

  console.log("Zoom:" + zoom);

  return (
    <>
      <Mapbox
        center={position}
        zoom={[zoom]}
        style="mapbox://styles/felixmayr/ck4h2kv441spq1co7x7hh17g0"
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        onZoomEnd={(_) => {
          setZoom(_.getZoom());
        }}
      >
        <Area zoom={zoom} />
      </Mapbox>
    </>
  );
};

const Area = ({ zoom }) => {
  const regions = [];
  const provinces = [];
  const cities = [];

  for (let i = 0; i < testjson.features.length; i++) {
    if (testjson.features[i].properties.priority === 0) {
      regions.push(testjson.features[i]);
    } else if (testjson.features[i].properties.priority === 10) {
      provinces.push(testjson.features[i]);
    } else if (testjson.features[i].properties.priority === 100) {
      cities.push(testjson.features[i]);
    }
  }

  if (zoom < 7.5) {
    return <Layer data={regions} color={"red"} />;
  } else if (zoom < 9) {
    return <Layer data={provinces} color={"green"} />;
  } else if (zoom > 9) {
    return <Layer data={cities} color={"blue"} />;
  }
};

export default Map;
