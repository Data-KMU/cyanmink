import useMapStore from '../../stores/dashboard/map';

const Positions: React.FC = () => {
  const { location, viewport } = useMapStore();
  return (
    <>
      <div className="inline-block bg-white rounded-lg overflow-hidden p-4 mr-2">
        <h3>Map Position</h3>
        <p>{String(Math.round(viewport.longitude * 100 + Number.EPSILON) / 100)}</p>
        <p>{String(Math.round(viewport.latitude * 100 + Number.EPSILON) / 100)}</p>
      </div>
      <div className="inline-block bg-white rounded-lg overflow-hidden p-4">
        <h3>Your Position</h3>
        <p>{String(Math.round(location.longitude * 100 + Number.EPSILON) / 100)}</p>
        <p>{String(Math.round(location.latitude * 100 + Number.EPSILON) / 100)}</p>
      </div>
    </>
  );
};

export default Positions;
