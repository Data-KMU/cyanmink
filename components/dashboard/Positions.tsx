import useMapStore from '../../stores/dashboard/map';

const Positions: React.FC = () => {
  const { location, viewport } = useMapStore();
  return (
    <div className="absolute h-screen flex">
      <div className="self-end z-10 bg-white rounded-lg overflow-hidden shadow-xl p-4 m-4">
        <h3>Position</h3>
        <p>{String(Math.round(viewport.longitude * 100 + Number.EPSILON) / 100)}</p>
        <p>{String(Math.round(viewport.latitude * 100 + Number.EPSILON) / 100)}</p>
        <p>{String(Math.round(viewport.zoom * 100 + Number.EPSILON) / 100)}</p>
      </div>
      <div className="self-end z-10 bg-white rounded-lg overflow-hidden shadow-xl p-4 m-4">
        <h3>Your Position</h3>
        <p>{String(Math.round(location.longitude * 100 + Number.EPSILON) / 100)}</p>
        <p>{String(Math.round(location.latitude * 100 + Number.EPSILON) / 100)}</p>
      </div>
    </div>
  );
};

export default Positions;
