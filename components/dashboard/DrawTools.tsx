import { DrawPolygonMode, EditingMode } from 'react-map-gl-draw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrawPolygon, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import useMapStore from '../../stores/dashboard/map';
import useEditorStore from '../../stores/dashboard/editor';

const DrawTools: React.FC = () => {
  console.log('Draw Tools Trigger');

  const features = useMapStore((state) => state.features);
  const deleteFeature = useMapStore((state) => state.deleteFeature);
  const { selectedFeatureIndex, editor, modeNr, setMode, setModeNr } = useEditorStore();

  return (
    <div className="self-start pointer-events-auto">
      <button
        className={
          'self-start bg-white rounded-lg overflow-hidden shadow-xl p-4 m-2 outline-none ' +
          (modeNr === 0 ? 'border-solid border-2 border-black' : '')
        }
        title="Editing Mode"
        onClick={(): void => {
          setMode(new EditingMode());
          setModeNr(0);
        }}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button
        className={
          'self-start bg-white rounded-lg overflow-hidden shadow-xl p-4 m-2 outline-none ' +
          (modeNr === 1 ? 'border-solid border-2 border-black' : '')
        }
        title="Polygon Tool"
        onClick={(): void => {
          setMode(new DrawPolygonMode());
          setModeNr(1);
        }}
      >
        <FontAwesomeIcon icon={faDrawPolygon} />
      </button>
      <button
        className="self-start bg-white rounded-lg overflow-hidden shadow-xl p-4 m-2 outline-none"
        title="Delete"
        onClick={(): void => {
          if (selectedFeatureIndex != null) {
            editor.current.deleteFeatures(selectedFeatureIndex);
            deleteFeature(selectedFeatureIndex);
          }
          setMode(new EditingMode());
          setModeNr(0);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button
        className="self-start bg-white rounded-lg overflow-hidden shadow-xl p-4 m-2 outline-none"
        title="Delete"
        onClick={(): void => console.log(features)}
      >
        CL Features
      </button>
    </div>
  );
};

export default DrawTools;
