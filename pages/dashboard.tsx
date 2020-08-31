import Head from 'next/head';

import Map from '../components/dashboard/Map';
import Positions from '../components/dashboard/Positions';
import DrawTools from '../components/dashboard/DrawTools';
import FeatureList from '../components/dashboard/FeatureList';

const Dashboard = (): JSX.Element => {
  return (
    <>
      <div className="w-full h-screen absolute">
        <Head>
          <title>Dashboard</title>
        </Head>
        <DrawTools />
        <FeatureList />
        <Positions />
        <Map />
      </div>
    </>
  );
};

export default Dashboard;
