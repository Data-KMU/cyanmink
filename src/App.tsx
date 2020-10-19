import React from 'react';

import Map from './components/Map';
import LoadingOverlay from './components/LoadingOverlay'
import FeatureList from './components/FeatureList';

function App() {
  return (
    <div>
      <LoadingOverlay />
      <Map />
      <div className="container">
      <FeatureList />
      </div>
    </div>
  );
}

export default App;
