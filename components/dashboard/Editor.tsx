import { useRef } from 'react';
import { Editor, EditingMode } from 'react-map-gl-draw';

import useMapStore from '../../stores/dashboard/map';
import useEditorStore from '../../stores/dashboard/editor';
import { getEditHandleStyle, getFeatureStyle } from '../../styles/editorStyle';

const MapEditor: React.FC = () => {
  const { addFeature, updateCoordinates } = useMapStore();
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
    if (editor.current !== null && editType === 'addFeature') {
      setMode(new EditingMode());
      setModeNr(0);
      addFeature(data[data.length - 1]);
    }
    if (editor.current !== null && editType === 'movePosition') {
      updateCoordinates(selectedFeatureIndex, editor.current.getFeatures()[selectedFeatureIndex]);
    }
    console.log('onUpd Trigger', selectedFeatureIndex, editType);
  };

  return (
    <>
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
        editHandleStyle={getEditHandleStyle}
        featureStyle={getFeatureStyle}
        selectedFeatureIndex={selectedFeatureIndex}
      />
    </>
  );
};

export default MapEditor;
