import React from 'react';

import Map from './components/Map';
import Button from './components/Button';
import LoadingOverlay from './components/LoadingOverlay'

function App() {
  return (
    <div>
      <LoadingOverlay />
      <Map />
      <Button />
    </div>
  );
}

export default App;
