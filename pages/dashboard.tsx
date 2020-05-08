import Head from 'next/head';

import Map from '../components/dashboard/Map';
import useMapStore from '../stores/dashboard/map';

const Dashboard: React.FC = () => {
  const { location, viewport } = useMapStore();

  return (
    <div className="h-screen flex">
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="fixed bottom-0 right-0 z-10 bg-white rounded-lg overflow-hidden shadow-xl p-4 m-4">
        <h3>Position</h3>
        <p>{String(Math.round(viewport.longitude * 100 + Number.EPSILON) / 100)}</p>
        <p>{String(Math.round(viewport.latitude * 100 + Number.EPSILON) / 100)}</p>
        <p>{String(Math.round(viewport.zoom * 100 + Number.EPSILON) / 100)}</p>
      </div>
      <div className="fixed top-0 right-0 z-10 bg-white rounded-lg overflow-hidden shadow-xl p-4 m-4">
        <h3>Your Position</h3>
        <p>{String(Math.round(location.longitude * 100 + Number.EPSILON) / 100)}</p>
        <p>{String(Math.round(location.latitude * 100 + Number.EPSILON) / 100)}</p>
      </div>
      <Map />
    </div>
  );
};

export default Dashboard;
