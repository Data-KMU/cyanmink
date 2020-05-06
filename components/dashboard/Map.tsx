import { useState } from 'react';
import MapGL from 'react-map-gl';

const TOKEN =
  'pk.eyJ1IjoiZmVsaXhtYXlyIiwiYSI6ImNrNXd0amFhdzBwZjQzbGxiM3R4MGZlNzMifQ.rIemWdlB7VZpv19AZDWKTQ';

const Map: React.FC = () => {
  const [viewport, setViewport] = useState({});

  const updateViewport = (viewport: Record<string, any>): void => {
    setViewport(viewport);
  };

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/felixmayr/ck4h2kv441spq1co7x7hh17g0"
      mapboxApiAccessToken={TOKEN}
      onViewportChange={updateViewport}
    ></MapGL>
  );
};

export default Map;
