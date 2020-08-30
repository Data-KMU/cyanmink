import Head from 'next/head';

import Map from '../components/dashboard/Map';
import Positions from '../components/dashboard/Positions';
import DrawTools from '../components/dashboard/DrawTools';
import FeatureList from '../components/dashboard/FeatureList';
import JSONViewer from '../components/dashboard/JSONViewer';

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="w-full h-screen absolute">
        <Head>
          <title>Dashboard</title>
        </Head>
        <DrawTools />
        <FeatureList />
        <div className="abs-overlay left-0 bottom-0 ml-2 mb-2 flex items-end">
          <Positions />
          <JSONViewer />
        </div>
        <Map />
      </div>
    </>
  );
};

export default Dashboard;
