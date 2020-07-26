import { Editor, EditingMode } from 'react-map-gl-draw';
import { useRef } from 'react';
import useMapStore from '../../stores/dashboard/map';
import useEditorStore from '../../stores/dashboard/editor';

const MapEditor: React.FC = () => {
  const { addFeature, updateFeature } = useMapStore();
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

  const onUpdate = (editType: string): void => {
    if (editor.current !== null && editType === 'addFeature') {
      setMode(new EditingMode());
      setModeNr(0);
      addFeature(editor.current.getFeatures());
    }
    if (editor.current !== null && editType === 'movePosition') {
      updateFeature(selectedFeatureIndex, editor.current.getFeatures()[selectedFeatureIndex]);
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
        onUpdate={({ editType }: { editType: string }): void => onUpdate(editType)}
        editHandleShape={'circle'}
        selectedFeatureIndex={selectedFeatureIndex}
      />
    </>
  );
};

export default MapEditor;
