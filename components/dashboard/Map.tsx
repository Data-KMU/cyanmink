import MapGL from 'react-map-gl';

import { getUserPosition } from '../../utils/getUserPosition';
import Loading from './Loading';
import MapContent from './MapContent';
import useMapStore from '../../stores/dashboard/map';
import MapEditor from './Editor';

const TOKEN =
  'pk.eyJ1IjoiZmVsaXhtYXlyIiwiYSI6ImNrNXd0amFhdzBwZjQzbGxiM3R4MGZlNzMifQ.rIemWdlB7VZpv19AZDWKTQ';

const Map: React.FC = () => {
  const { viewport, loaded, updateViewport, setLocation } = useMapStore();

  const onLoad = (): void => {
    getUserPosition()
      .then((coords) => {
        updateViewport({ ...coords, zoom: 8 });
        setLocation(coords);
      })
      .catch((e) => {
        if (e.name == 'PositionError') {
          console.log(e.message + '. code = ' + e.code);
        }
      });
  };

  return (
    <>
      {!loaded && <Loading />}
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/felixmayr/ck4h2kv441spq1co7x7hh17g0"
        mapboxApiAccessToken={TOKEN}
        onLoad={onLoad}
        onViewportChange={(viewState): void => updateViewport(viewState)}
      >
        <MapContent />
        <MapEditor />
      </MapGL>
    </>
  );
};

export default Map;
