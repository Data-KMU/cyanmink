import Head from 'next/head';

import Map from '../components/dashboard/Map';
import Positions from '../components/dashboard/Positions';
import DrawTools from '../components/dashboard/DrawTools';
import AreaList from '../components/dashboard/AreaList';
import JSONViewer from '../components/dashboard/JSONViewer';

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="h-screen flex">
        <Head>
          <title>Dashboard</title>
        </Head>
        <div className="absolute flex justify-between w-full z-20 pointer-events-none">
          <DrawTools />
          <AreaList />
          <Positions />
        </div>
        <div className="absolute flex right-0 z-20 h-full overflow-hidden">
          <JSONViewer />
        </div>
        <Map />
      </div>
    </>
  );
};

export default Dashboard;
