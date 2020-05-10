import MapGL from 'react-map-gl';

import { getUserPosition } from '../../utils/getUserPosition';
import Loading from './Loading';
import MapContent from './MapContent';
import useMapStore from '../../stores/dashboard/map';
import MapEditor from './Editor';

const TOKEN =
  'pk.eyJ1IjoiZmVsaXhtYXlyIiwiYSI6ImNrNXd0amFhdzBwZjQzbGxiM3R4MGZlNzMifQ.rIemWdlB7VZpv19AZDWKTQ';

const Map: React.FC = () => {
  const { viewport, loaded, updateViewport, setLocation } = useMapStore();

  const onLoad = (): void => {
    getUserPosition()
      .then((coords) => {
        updateViewport({ ...coords, zoom: 8 });
        setLocation(coords);
      })
      .catch((e) => {
        if (e.name == 'PositionError') {
          console.log(e.message + '. code = ' + e.code);
        }
      });
  };

  return (
    <>
      {!loaded && <Loading />}
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/felixmayr/ck4h2kv441spq1co7x7hh17g0"
        mapboxApiAccessToken={TOKEN}
        onLoad={onLoad}
        onViewportChange={(viewState): void => updateViewport(viewState)}
      >
        <MapContent />
        <MapEditor />
      </MapGL>
    </>
  );
};

export default Map;

/*import React, { useEffect, useState } from 'react';
import MapGL from 'react-map-gl';
import { UseStore } from 'zustand';

import { getUserPosition } from '../../utils/getUserPosition';
import Loading from './Loading';

const TOKEN =
  'pk.eyJ1IjoiZmVsaXhtYXlyIiwiYSI6ImNrNXd0amFhdzBwZjQzbGxiM3R4MGZlNzMifQ.rIemWdlB7VZpv19AZDWKTQ';

type Props = {
  useStore: UseStore<Record<string | number | symbol, any>>;
};

const Map: React.FC<Props> = ({ useStore }: Props) => {
  //const [viewport] = useState({});
  //const { viewport, update } = useStore();
  const [pos, setPos] = useState(false);
  const [view, setView] = useState({});

  //console.log(viewport);
*/
