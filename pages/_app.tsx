import { AppProps } from 'next/app';
import '../styles/index.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;
