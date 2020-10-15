import React from 'react';

import { useMapStore } from '../stores/map';

function Button() {
  const features = useMapStore((state) => state.features);

  return <button className="console-button" onClick={() => console.log(features)}>features</button>;
}

export default Button;
