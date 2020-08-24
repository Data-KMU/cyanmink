import { useState } from 'react';

import useMapStore, { Area } from '../../stores/dashboard/map';
import useEditorStore from '../../stores/dashboard/editor';
import { EditingMode } from 'react-map-gl-draw';

type AreaInfoProps = { area: Area; index: number; active: boolean };
type AreaItemProps = { area: Area; index: number };

const AreaInfo = ({ area, index, active }: AreaInfoProps) => {
  const { updateInfos } = useMapStore();

  function updateInfo(input: string, type: string) {
    if (type === 'elevation') {
      updateInfos(index, {
        elevation: Number(input),
        height: area.height,
        name: area.properties.name,
      });
    } else if (type === 'height') {
      updateInfos(index, {
        elevation: area.elevation,
        height: Number(input),
        name: area.properties.name,
      });
    } else if (type === 'name') {
      updateInfos(index, { elevation: area.elevation, height: area.height, name: input });
    }
  }

  return (
    <ul className={`${active ? '' : 'hidden'} mt-4 w-full`}>
      <li>
        <h4>Name:</h4>
        <input
          type="text"
          placeholder={area.properties.name}
          onChange={(e) => updateInfo(e.target.value, 'name')}
          className="w-full"
        />
      </li>
      <li>
        <h4>Elevation:</h4>
        <input
          type="text"
          placeholder={String(area.elevation)}
          onChange={(e) => updateInfo(e.target.value, 'elevation')}
          className="w-full"
        />
      </li>
      <li>
        <h4>Height:</h4>
        <input
          type="text"
          placeholder={String(area.height)}
          onChange={(e) => updateInfo(e.target.value, 'height')}
          className="w-full"
        />
      </li>
    </ul>
  );
};

const AreaItem = ({ area, index }: AreaItemProps) => {
  const [info, setInfo] = useState(false);
  const { deleteFeature } = useMapStore();
  const {
    editor,
    selectedFeatureIndex,
    setMode,
    setModeNr,
    setSelectedFeatureIndex,
  } = useEditorStore();

  return (
    <li
      key={index}
      className="flex flex-col items-end pointer-events-auto bg-white rounded-lg overflow-hidden shadow-xl p-4 m-2"
    >
      <div className="flex w-full justify-between">
        <h3 className="mr-8 font-bold">{area.properties.name}</h3>
        <div className="flex items-center">
          <button
            onClick={() => {
              setMode(new EditingMode());
              setSelectedFeatureIndex(index);
              setModeNr(0);
            }}
            className="mr-4"
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
            onClick={() => {
              editor.current.deleteFeatures(index);
              deleteFeature(selectedFeatureIndex);
            }}
            className="mr-4"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="trash w-5 h-5">
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button onClick={() => setInfo((prevState) => !prevState)}>
            {info ? (
              <svg viewBox="0 0 20 20" fill="currentColor" className="chevron-up w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="currentColor" className="chevron-down w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <AreaInfo area={area} index={index} active={info} />
    </li>
  );
};

const AreaList: React.FC = () => {
  const { features } = useMapStore();

  return (
    <ul>
      {features.map((area: Area, i: number) => (
        <AreaItem area={area} index={i} key={i} />
      ))}
    </ul>
  );
};

export default AreaList;
