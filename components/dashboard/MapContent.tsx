import { Marker } from 'react-map-gl';
import useMapStore from '../../stores/dashboard/map';

const MapContent: React.FC = () => {
  const { loaded, location } = useMapStore();

  return (
    <>
      {loaded && (
        <Marker latitude={location.latitude} longitude={location.longitude}>
          <svg height="20" width="20">
            <circle cx="10" cy="10" r="10" fill="black" />
          </svg>
        </Marker>
      )}
    </>
  );
};

export default MapContent;
