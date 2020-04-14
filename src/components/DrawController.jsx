import React from "react";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

function DrawController() {
  const onDrawCreate = ({ features }) => {
    console.log(features);
  };

  const onDrawUpdate = ({ features }) => {
    console.log(features);
  };

  return (
    <DrawControl
      onDrawCreate={onDrawCreate}
      onDrawUpdate={onDrawUpdate}
      displayControlsDefault={false}
      controls={{ polygon: true, trash: true }}
    />
  );
}

export default DrawController;
