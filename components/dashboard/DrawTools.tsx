import { DrawPolygonMode, EditingMode } from 'react-map-gl-draw';

import useMapStore from '../../stores/dashboard/map';
import useEditorStore from '../../stores/dashboard/editor';

const DrawTools: React.FC = () => {
  console.log('Draw Tools Trigger');

  const deleteFeature = useMapStore((state: any) => state.deleteFeature);
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
        <svg viewBox="0 0 20 20" fill="currentColor" className="hand w-5 h-5">
          <path
            fillRule="evenodd"
            d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z"
            clipRule="evenodd"
          />
        </svg>
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
        <svg viewBox="0 0 20 20" fill="currentColor" className="pencil-alt w-5 h-5">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path
            fillRule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clipRule="evenodd"
          />
        </svg>
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
        <svg viewBox="0 0 20 20" fill="currentColor" className="trash w-5 h-5">
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default DrawTools;
