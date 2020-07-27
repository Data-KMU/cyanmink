import { Feature } from 'geojson';
import useMapStore from '../../stores/dashboard/map';
import useEditorStore from '../../stores/dashboard/editor';
import { EditingMode } from 'react-map-gl-draw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const MapContent: React.FC = () => {
  const { features, deleteFeature } = useMapStore();
  const {
    editor,
    selectedFeatureIndex,
    setMode,
    setModeNr,
    setSelectedFeatureIndex,
  } = useEditorStore();

  const areas = features.map((_: Feature, i: number) => (
    <li
      key={i}
      className="pointer-events-auto bg-white rounded-lg overflow-hidden shadow-xl p-4 m-2"
    >
      <button
        onClick={() => {
          setMode(new EditingMode());
          setSelectedFeatureIndex(i);
          setModeNr(0);
        }}
      >
        <p className="inline mr-4">Area {i}</p>
      </button>
      <button>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => {
            editor.current.deleteFeatures(i);
            deleteFeature(selectedFeatureIndex);
          }}
        />
      </button>
    </li>
  ));

  return (
    <>
      <ul>{areas}</ul>
    </>
  );
};

export default MapContent;
