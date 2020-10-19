import React, { useRef } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

import Editor from '../components/Editor';
import { useMapStore } from '../stores/map';
import { useInterfaceStore } from '../stores/interface';
import { getUserPosition } from '../utils/getUserLocation';
import { getSpatialEntities, getSpatialEntitiesIDs } from '../utils/fetchTaaja';
import { entityToFeature } from '../utils/jsonConverter';


function Map() {
  const MapRef = useRef<any>();
  const DrawControlRef = useRef<any>();

  const addFeature = useMapStore((state) => state.addFeature);
  const updateCoords = useMapStore((state) => state.updateCoords);
  const setLoaded = useInterfaceStore((state) => state.setLoaded);

  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_KEY!,
  });

  const onStyleLoad = (map: any) => {
    getUserPosition()
      .catch((e) => {
        if (e.name === 'PositionError') {
          console.log(e.message + '. code = ' + e.code);
        }
      })
      .then((coords) => {
        if (coords) {
          // Move Map To Location
          map.flyTo({ center: [coords.longitude, coords.latitude] });

          // State Updates
          updateCoords([coords.longitude, coords.latitude]);
          setLoaded();

          // Purpletiger Abfrage
          return getSpatialEntitiesIDs(coords).then(res => res.spatialEntities);
        }
      })
      .then((entitiesIDs) => {
        console.log(entitiesIDs);

        // Hardcoded till Purpletiger gives back IDs
        const hardCodedEntitiesIDS = ['c56b3543-6853-4d86-a7bc-1cde673a5582', 'eba71d74-a1f5-4c8d-a462-4c04234ebed4', '6153f535-62fe-42d2-956c-d1af5e1dc935', '8f6e2a67-5d95-484d-8fdc-46de09322193', 'a1ec86cc-537a-4ec3-ab00-c64d96577d4c', '5c35b853-c693-420d-936a-da9516d4106f'];

        hardCodedEntitiesIDS!.forEach(entityID => {
          getSpatialEntities(entityID).then(res => {
            const convertedEntity = entityToFeature(res);

            DrawControlRef.current.draw.add(convertedEntity);
            addFeature(convertedEntity);
          });
        });
      });
  };

  return (
    <Map
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/streets-v11"
      containerStyle={{
        height: '100vh',
        width: '100vw',
      }}
      ref={MapRef}
      onStyleLoad={map => onStyleLoad(map)}
    >
      <Editor DrawRef={DrawControlRef}/>
    </Map>
  );
}

export default Map;
