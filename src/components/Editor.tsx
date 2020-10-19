import React from 'react';
import DrawControl from 'react-mapbox-gl-draw';

import { useMapStore } from '../stores/map';
import { patchSpatialEntity, postSpatialEntity } from '../utils/fetchTaaja';
import { featureToEntity } from '../utils/jsonConverter';

type EditorProps = {
  DrawRef: React.RefObject<any>
}

function Editor({ DrawRef }: EditorProps) {
  const addFeature = useMapStore((state) => state.addFeature);
  const updateFeatureCoords = useMapStore((state) => state.updateFeatureCoords);

  const onDrawCreate = (e: any) => {
    const feature = e.features[0];
    const featureID = feature.id;

    addFeature(feature);

    console.log(feature);
    console.log(featureToEntity(feature));

    postSpatialEntity(featureToEntity(feature)).then(res => {
      DrawRef.current.draw.delete(featureID);

      feature.id = res.targetId;

      DrawRef.current.draw.add(feature);
      console.log(res.targetId);
    });
  };

  const onDrawUpdate = (e: any) => {
    const action = e.action;
    const features = e.features;

    switch (action) {
      case 'change_coordinates': {
        console.log('Coord edit', features);

        const editedFeature = features[0];
        updateFeatureCoords(editedFeature);

        patchSpatialEntity({ coordinates: editedFeature.geometry.coordinates }, features[0].id).then(res => console.log(res));
        break;
      }
      case 'move': {
        console.log('Coord move', e);
        break;
      }
      default: {
        console.log(action);
      }
    }
  };

  return (
    <>
      <DrawControl
        controls={{
          point: false,
          trash: false,
          combine_features: false,
          uncombine_features: false,
          line_string: false
        }}
        onDrawCreate={onDrawCreate}
        onDrawUpdate={onDrawUpdate}
        ref={DrawRef}
      />
    </>
  );
}

export default Editor;
