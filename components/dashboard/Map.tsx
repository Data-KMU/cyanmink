import MapGL from 'react-map-gl';

import { getUserPosition } from '../../utils/getUserPosition';
import Loading from './Loading';
import MapContent from './MapContent';
import MapEditor from './Editor';
import useMapStore from '../../stores/dashboard/map';
import useInterfaceStore from '../../stores/dashboard/interface';

const Map: React.FC = () => {
  const { viewport, loaded, updateViewport, setLocation } = useMapStore();
  const { setLoaded } = useInterfaceStore();

  const onLoad = (): void => {
    getUserPosition()
      .catch((e) => {
        if (e.name == 'PositionError') {
          console.log(e.message + '. code = ' + e.code);
        }
      })
      .then((coords) => {
        updateViewport({ ...coords, zoom: 8 });
        setLocation(coords);
        setLoaded(true);
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
        mapboxApiAccessToken={process.env.MAPBOX}
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
