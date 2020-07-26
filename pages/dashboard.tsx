import Head from 'next/head';

import Map from '../components/dashboard/Map';
import Positions from '../components/dashboard/Positions';
import DrawTools from '../components/dashboard/DrawTools';
import AreaList from '../components/dashboard/AreaList';

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="h-screen flex">
        <Head>
          <title>Dashboard</title>
        </Head>

        <div className="absolute flex justify-between w-full z-20 pointer-events-none">
          <DrawTools />
          <Positions />
          <AreaList />
        </div>

        <Map />
      </div>
    </>
  );
};

export default Dashboard;
