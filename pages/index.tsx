import Layout from '../components/Layout';
import Login from '../components/index/Login';

const Home: React.FC = () => {
  const user = true;

  return <Layout>{user ? <Login /> : <p>no</p>}</Layout>;
};

export default Home;
