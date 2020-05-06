import { useEffect, useState } from 'react';
import MapGL, { ViewportProps } from 'react-map-gl';

import { getUserPosition } from '../../utils/getUserPosition';

const TOKEN =
  'pk.eyJ1IjoiZmVsaXhtYXlyIiwiYSI6ImNrNXd0amFhdzBwZjQzbGxiM3R4MGZlNzMifQ.rIemWdlB7VZpv19AZDWKTQ';

const Map: React.FC = () => {
  const [viewport, setViewport] = useState({});
  const [pos, setPos] = useState(false);

  const updateViewport = (viewport: ViewportProps): void => {
    setViewport(viewport);
  };

  useEffect(() => {
    getUserPosition()
      .then((coords) => {
        setPos(true);
        setViewport((oldView) => ({
          ...oldView,
          longitude: coords.longitude,
          latitude: coords.latitude,
          zoom: 9,
        }));
      })
      .catch((e) => {
        if (e.name == 'PositionError') {
          console.log(e.message + '. code = ' + e.code);
        }
      });
  }, []);

  return (
    <>
      {pos ? (
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/felixmayr/ck4h2kv441spq1co7x7hh17g0"
          mapboxApiAccessToken={TOKEN}
          onViewportChange={updateViewport}
        ></MapGL>
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default Map;
