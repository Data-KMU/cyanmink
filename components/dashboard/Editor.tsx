import { Editor, DrawPolygonMode, EditingMode } from 'react-map-gl-draw';
import { useRef, useState } from 'react';

const MapEditor: React.FC = () => {
  const [mode, setMode] = useState<EditingMode | DrawPolygonMode>();
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState<number>(0);
  const editor = useRef<Editor>(null);

  const onSelect = (options: any): void => {
    setSelectedFeatureIndex(options && options.selectedFeatureIndex);
  };

  const onDelete = (): void => {
    const selectedIndex = selectedFeatureIndex;
    if (selectedIndex !== null && selectedIndex >= 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      editor.current.deleteFeatures(selectedIndex);
    }
  };

  const onUpdate = (editType: string): void => {
    if (editType === 'addFeature') {
      setMode(new EditingMode());
    }
  };

  const renderDrawTools = (): JSX.Element => {
    return (
      <div className="mapboxgl-ctrl-top-left">
        <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
          <button
            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_polygon"
            title="Polygon tool (p)"
            style={mode === undefined ? undefined : { backgroundColor: 'blue' }}
            onClick={(): void => setMode(mode === undefined ? new DrawPolygonMode() : undefined)}
          />
          <button
            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash"
            title="Delete"
            onClick={onDelete}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <Editor
        ref={editor}
        style={{ width: '100%', height: '100%' }}
        clickRadius={12}
        mode={mode}
        onSelect={(options: any): void => onSelect(options)}
        onUpdate={onUpdate}
        editHandleShape={'circle'}
        selectedFeatureIndex={selectedFeatureIndex}
      />
      {renderDrawTools()}
    </>
  );
};

export default MapEditor;
