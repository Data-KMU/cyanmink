import React from 'react';

import { useInterfaceStore } from '../stores/interface';

function LoadingOverlay() {
  const loaded = useInterfaceStore((state) => state.loaded);

  return (
    <div className={loaded ? 'overlay': 'overlay active'}>
      <p>Loading location...</p>
    </div>
  );
}

export default LoadingOverlay;
