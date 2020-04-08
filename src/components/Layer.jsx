import React from "react";
import { GeoJSONLayer } from "react-mapbox-gl";

function Layer({ data, color, name }) {
  const json = {
    type: "FeatureCollection",
    features: data,
  };

  return (
    <GeoJSONLayer
      data={json}
      symbolLayout={{
        "text-field": "{name}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-anchor": "center",
      }}
      lineLayout={{
        visibility: "visible",
        "line-join": "round",
        "line-cap": "round",
      }}
      linePaint={{
        "line-width": 4,
        "line-color": color,
      }}
      fillPaint={{
        "fill-color": color,
        "fill-opacity": 0.1,
      }}
    />
  );
}

export default Layer;
