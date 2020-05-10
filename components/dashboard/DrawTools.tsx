import { DrawPolygonMode, EditingMode } from 'react-map-gl-draw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrawPolygon, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

//import useMapStore from '../../stores/dashboard/map';
import useEditorStore from '../../stores/dashboard/editor';

const DrawTools: React.FC = () => {
  console.log('Draw Tools Trigger');

  //const { features } = useMapStore();
  const { modeNr, setMode, setModeNr } = useEditorStore();

  return (
    <div className="top-0 absolute h-screen flex z-20">
      <button
        className={
          'self-start bg-white rounded-lg overflow-hidden shadow-xl p-4 m-4 outline-none ' +
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
          'self-start bg-white rounded-lg overflow-hidden shadow-xl p-4 m-4 outline-none ' +
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
        className="self-start bg-white rounded-lg overflow-hidden shadow-xl p-4 m-4 outline-none"
        title="Delete"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button
        className="self-start bg-white rounded-lg overflow-hidden shadow-xl p-4 m-4 outline-none"
        title="Delete"
        //onClick={(): void => console.log(features)}
      >
        CL Features
      </button>
    </div>
  );
};

export default DrawTools;
