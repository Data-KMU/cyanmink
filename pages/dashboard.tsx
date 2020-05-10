import Head from 'next/head';

import Map from '../components/dashboard/Map';
import Positions from '../components/dashboard/Positions';
import DrawTools from '../components/dashboard/DrawTools';

const Dashboard: React.FC = () => {
  console.log('hello');

  return (
    <div className="h-screen flex">
      <Head>
        <title>Dashboard</title>
      </Head>
      <DrawTools />
      <Positions />
      <Map />
    </div>
  );
};

export default Dashboard;
