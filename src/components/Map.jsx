import React, { useState } from "react";
import { GeolocateControl } from "mapbox-gl";
import ReactMapboxGl from "react-mapbox-gl";

import Layer from "./Layer";
import DrawContoller from "./DrawController";
import testjson from "../json/test.json";

const Mapbox = ReactMapboxGl({
  accessToken: process.env.MAPBOX_AT,
  dragRotate: false,
});

const Map = () => {
  const [position, setPosition] = useState([12.1692, 47.5827]);
  const [zoom, setZoom] = useState(7);

  const onLoad = (map) => {
    map.addControl(new GeolocateControl({ showAccuracyCircle: false }));

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        map.setCenter([position.coords.longitude, position.coords.latitude]);
      });
    } else {
      console.error("Geolocation not available");
    }
  };

  const onZoom = (map) => {
    let mapZoom = map.getZoom();
    setZoom(mapZoom);
    console.log("Current Zoom: " + mapZoom);
  };

  const onMove = (map) => {
    let mapPos = Object.values(map.getCenter());
    setPosition(mapPos);
    console.log("Current Position: " + mapPos);
  };

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
        onZoomEnd={onZoom}
        onMoveEnd={onMove}
        onStyleLoad={onLoad}
      >
        <DrawContoller />
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
