import { useRef } from 'react';
import MapGL, { ViewportProps } from 'react-map-gl';
import { EditingMode, Editor } from 'react-map-gl-draw';

import MapContent from './MapContent';
import useMapStore from '../../stores/dashboard/map';
import useInterfaceStore from '../../stores/dashboard/interface';
import { getUserPosition } from '../../utils/getUserPosition';
import { editHandleStyle, featureStyle } from '../../styles/editorStyle';
import useEditorStore from '../../stores/dashboard/editor';
import { getFeature, getSpacialEntities } from '../../utils/getSpacialEntities';
import { spatialJSONToGeoJSON } from '../../utils/featureConvertor';

const Map: React.FC = () => {
  const {
    viewport,
    updateViewport,
    setLocation,
    addGeoFeature,
    addSpatialFeature,
    updateCoordinates,
    location,
  } = useMapStore();
  const { setLoaded } = useInterfaceStore();
  const {
    mode,
    setMode,
    setModeNr,
    selectedFeatureIndex,
    setSelectedFeatureIndex,
    setEditor,
  } = useEditorStore();

  const editor = useRef<Editor>(null);

  const onSelect = (options: any): void => {
    setSelectedFeatureIndex(options && options.selectedFeatureIndex);
    console.log('onSel Trigger', options);
    setEditor(editor);
  };

  const onUpdate = (editType: string, data: any): void => {
    const addedFeature = data[data.length - 1];

    if (editor.current !== null && editType === 'addFeature') {
      setMode(new EditingMode());
      setModeNr(0);
      if (addedFeature.geometry.type === 'Polygon') {
        addGeoFeature(addedFeature, 'Area');
      } else {
        addGeoFeature(addedFeature, 'Corridor');
      }
    }
    if (editor.current !== null && editType === 'movePosition') {
      updateCoordinates(selectedFeatureIndex, editor.current.getFeatures()[selectedFeatureIndex]);
    }
    console.log('onUpd Trigger', selectedFeatureIndex, editType);
  };

  const onLoad = (): void => {
    getUserPosition()
      .catch((e) => {
        if (e.name == 'PositionError') {
          console.log(e.message + '. code = ' + e.code);
        }
      })
      .then((coords) => {
        updateViewport({ ...coords, zoom: 8 });
        setLocation(coords);
        setLoaded(true);
        return getSpacialEntities(location);
      })
      .then((ids) => {
        return getFeature(ids[0]);
      })
      .then((feature) => {
        editor.current
          ? editor.current.addFeatures(spatialJSONToGeoJSON(feature.data))
          : console.error('Editor not mounted');

        addSpatialFeature(feature.data);
      });
  };

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={process.env.MAPBOX}
      onLoad={onLoad}
      onViewportChange={(viewState: ViewportProps): void => updateViewport(viewState)}
      style={{ cursor: 'pointer' }}
    >
      <MapContent />
      <Editor
        ref={editor}
        style={{ width: '100%', height: '100%' }}
        clickRadius={12}
        mode={mode}
        onSelect={(options: any): void => onSelect(options)}
        onUpdate={({ editType, data }: { editType: string; data: any }): void =>
          onUpdate(editType, data)
        }
        editHandleShape={'circle'}
        editHandleStyle={editHandleStyle}
        featureStyle={featureStyle}
        selectedFeatureIndex={selectedFeatureIndex}
      />
    </MapGL>
  );
};

export default Map;
