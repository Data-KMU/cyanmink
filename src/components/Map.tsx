import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { useMapStore } from '../stores/map';

function Editor() {
  const addFeature = useMapStore((state) => state.addFeature);
  const create = (e: any) => addFeature(e.features[0]);

  return (
    <DrawControl
      controls={{
        point: false,
        trash: false,
        combine_features: false,
        uncombine_features: false,
      }}
      onDrawCreate={create}
      onDrawUpdate={(e) => console.log(e)}
    />
  );
}

function Map() {
  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_KEY!,
  });

  return (
    <Map
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/streets-v11"
      containerStyle={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Editor />
    </Map>
  );
}

export default Map;
