import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { EditingMode } from 'react-map-gl-draw';
import pull from 'lodash/pull';
import map from 'lodash/map';

import useMapStore, { Area } from '../../stores/dashboard/map';
import useEditorStore from '../../stores/dashboard/editor';
import useInterfaceStore from '../../stores/dashboard/interface';
import FeatureSearch from './FeatureSearch';

type FeatureInfoProps = { feature: Area; index: number; active: boolean };
type FeatureProps = {
  feature: Area;
  index: number;
  checked: number[];
  setChecked: Dispatch<SetStateAction<number[]>>;
};

const FeatureInfo = ({ feature, index, active }: FeatureInfoProps) => {
  const { updateInfos } = useMapStore();

  function updateInfo(input: string, type: string) {
    if (type === 'elevation') {
      updateInfos(index, {
        elevation: Number(input),
        height: feature.height,
        name: feature.properties.name,
      });
    } else if (type === 'height') {
      updateInfos(index, {
        elevation: feature.elevation,
        height: Number(input),
        name: feature.properties.name,
      });
    } else if (type === 'name') {
      updateInfos(index, { elevation: feature.elevation, height: feature.height, name: input });
    }
  }

  return (
    <ul className={`${active ? '' : 'hidden'} mt-4 w-full`}>
      <li>
        <h4>Name:</h4>
        <input
          type="text"
          placeholder={feature.properties.name}
          onChange={(e) => updateInfo(e.target.value, 'name')}
          className="w-full"
        />
      </li>
      <li>
        <h4>Elevation:</h4>
        <input
          type="text"
          placeholder={String(feature.elevation)}
          onChange={(e) => updateInfo(e.target.value, 'elevation')}
          className="w-full"
        />
      </li>
      <li>
        <h4>Height:</h4>
        <input
          type="text"
          placeholder={String(feature.height)}
          onChange={(e) => updateInfo(e.target.value, 'height')}
          className="w-full"
        />
      </li>
    </ul>
  );
};

const Feature = ({ feature, index, checked, setChecked }: FeatureProps) => {
  const [info, setInfo] = useState(false);

  const { deleteFeature } = useMapStore();

  const {
    editor,
    selectedFeatureIndex,
    setMode,
    setModeNr,
    setSelectedFeatureIndex,
  } = useEditorStore();

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const indexItem = Number(e.currentTarget.value);
    if (checked.includes(indexItem)) {
      setChecked((prevState) => pull(prevState, indexItem));
    } else {
      setChecked((prevState) => [...prevState, indexItem]);
    }
  };

  return (
    <li
      key={index}
      className="flex flex-col items-end pointer-events-auto overflow-hidden p-4 border-t-2 border-gray-200"
    >
      <div className="flex w-full justify-between items-center">
        <input type="checkbox" value={index} onChange={(e) => handleCheckbox(e)} />
        <div className="flex w-full justify-between items-center ml-2">
          <h3 className="mr-8 font-bold">{feature.properties.name}</h3>
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
      </div>
      <FeatureInfo feature={feature} index={index} active={info} />
    </li>
  );
};

const FeatureList = (): JSX.Element => {
  const { features } = useMapStore();
  const { search } = useInterfaceStore();

  const [checked, setChecked] = useState<number[]>([]);

  return (
    <ul
      className="abs-overlay right-0 top-0 bg-white rounded-lg shadow-xl mr-2 mt-2"
      style={{ minWidth: '240px' }}
    >
      <h4 className="py-2 text-center font-bold border-b-2 border-gray-200">Features</h4>
      <FeatureSearch />
      {features
        .filter((feature: Area) => feature.properties.name.startsWith(search))
        .map((feature: Area, i: number) => (
          <Feature feature={feature} index={i} key={i} checked={checked} setChecked={setChecked} />
        ))}
      <div className="border-t-2 border-gray-200">
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(features, null, 2),
          )}`}
          download="areas.json"
          className="z-10"
        >
          <button className="p-4 pointer-events-auto" onClick={() => console.log(features)}>
            Download All
          </button>
        </a>
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(
              map(checked, (item) => features[item]),
              null,
              2,
            ),
          )}`}
          download="areas.json"
          className="z-10 border-l-2 border-gray-200"
        >
          <button
            className="p-4 pointer-events-auto"
            onClick={() => console.log(map(checked, (item) => features[item]))}
          >
            Download Selected
          </button>
        </a>
      </div>
    </ul>
  );
};

export default FeatureList;
