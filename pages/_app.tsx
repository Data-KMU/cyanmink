import { AppProps } from 'next/app';
import '../styles/tailwind.css';

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;
