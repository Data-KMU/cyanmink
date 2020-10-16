import React, { useEffect, useRef } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import { FeatureCollection } from 'geojson';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { useMapStore } from '../stores/map';
import { useInterfaceStore } from '../stores/interface';
import { getUserPosition } from '../utils/getUserLocation';
import { getSpatialEntities, getSpatialEntitiesIDs } from '../utils/fetchTaaja';

const featureCollection: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [
              -0.17612457275390622,
              51.54227825152732,
            ],
            [
              -0.2066802978515625,
              51.52903776845088,
            ],
            [
              -0.20050048828125,
              51.49335472541077,
            ],
            [
              -0.17200469970703125,
              51.493568479510415,
            ],
            [
              -0.1558685302734375,
              51.51493882813492,
            ],
            [
              -0.1558685302734375,
              51.53459069801548,
            ],
            [
              -0.17612457275390622,
              51.54227825152732,
            ],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [
              -0.14316558837890625,
              51.52241608253253,
            ],
            [
              -0.12325286865234374,
              51.51130657591914,
            ],
            [
              -0.0995635986328125,
              51.526261049659425,
            ],
            [
              -0.09990692138671875,
              51.5429188223739,
            ],
            [
              -0.12908935546875,
              51.543345864595416,
            ],
            [
              -0.14316558837890625,
              51.52241608253253,
            ],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [
              -0.1737213134765625,
              51.56021082691011,
            ],
            [
              -0.1737213134765625,
              51.54825656210027,
            ],
            [
              -0.15483856201171872,
              51.546548553515585,
            ],
            [
              -0.12050628662109375,
              51.5779229765343,
            ],
            [
              -0.14865875244140625,
              51.5779229765343,
            ],
            [
              -0.1737213134765625,
              51.56021082691011,
            ],
          ],
        ],
      },
    }, {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [
              12.179889678955078,
              47.602227802480606,
            ],
            [
              12.164697647094725,
              47.59059396105347,
            ],
            [
              12.176284790039062,
              47.585441831886776,
            ],
            [
              12.179889678955078,
              47.602227802480606,
            ],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [
              12.15611457824707,
              47.59233051951996,
            ],
            [
              12.143754959106445,
              47.59070973341061,
            ],
            [
              12.168474197387695,
              47.57218289857542,
            ],
            [
              12.15611457824707,
              47.59233051951996,
            ],
          ],
        ],
      },
    },
  ],
};

function Editor() {
  const DrawControlRef = useRef<any>();
  const addFeature = useMapStore((state) => state.addFeature);
  const addFeatures = useMapStore((state) => state.addFeatures);

  useEffect(() => {
    DrawControlRef.current.draw.set(featureCollection);
    addFeatures(featureCollection);
  }, [addFeature, addFeatures]);

  const onDrawCreate = (e: any) => addFeature(e.features[0]);

  return (
    <>
      <DrawControl
        controls={{
          point: false,
          trash: false,
          combine_features: false,
          uncombine_features: false,
        }}
        onDrawCreate={onDrawCreate}
        onDrawUpdate={(e) => console.log(e)}
        ref={DrawControlRef}
      />
    </>
  );
}

function Map() {
  const MapRef = useRef<any>();
  const updateCoords = useMapStore((state) => state.updateCoords);
  const toggleLoaded = useInterfaceStore((state) => state.toggleLoaded);

  const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_KEY!,
  });

  const onStyleLoad = (map: any) => {
    getUserPosition()
      .catch((e: any) => {
        if (e.name === 'PositionError') {
          console.error(e.message + '. code = ' + e.code);
        }
      })
      .then((coords) => {
        if (coords) {
          // Move Map To Location
          map.flyTo({ center: [coords.longitude, coords.latitude] });

          // State Updates
          updateCoords([coords.longitude, coords.latitude]);
          toggleLoaded();

          // Purpletiger Abfrage
          return getSpatialEntitiesIDs(coords).then(res => res.spatialEntities)
        }
      })
      .then((entitiesIDs) => {
        entitiesIDs!.forEach(entityID => {
          getSpatialEntities(entityID).then()
        })
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
      <Editor/>
    </Map>
  );
}

export default Map;
