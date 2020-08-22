import { useState } from 'react';

import useEditorStore from '../../stores/dashboard/editor';
import useMapStore from '../../stores/dashboard/map';

const PopUp: React.FC = () => {
  const { editor, popUp, triggerPopUp } = useEditorStore();
  const { addFeature } = useMapStore();

  const [state, setState] = useState<{ elevation: null | number; height: null | number }>({
    elevation: null,
    height: null,
  });

  function setElevation(elevation: string) {
    setState((prevState) => ({ ...prevState, elevation: Number(elevation) }));
  }

  function setHeight(height: string) {
    setState((prevState) => ({ ...prevState, height: Number(height) }));
  }

  function submitInfo() {
    const features = editor.current.state.featureCollection.featureCollection.features;
    triggerPopUp();
    addFeature(features[features.length - 1], state);
  }

  return (
    <>
      {popUp && (
        <div className="fixed z-10 inset-0 overflow-y-auto min-h-screen bg-black bg-opacity-25">
          <div className="min-h-screen max-w-md flex flex-col items-center justify-center mx-auto">
            <input
              type="text"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Elevation"
              onChange={(e) => setElevation(e.target.value)}
            />
            <input
              type="text"
              className="mt-6 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Height"
              onChange={(e) => setHeight(e.target.value)}
            />
            <button
              type="submit"
              className={`${
                state.height == null ||
                state.elevation == null ||
                state.height == 0 ||
                state.elevation == 0
                  ? 'bg-opacity-25 hover:bg-opacity-25'
                  : ''
              } mt-6 w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700`}
              onClick={() => submitInfo()}
            >
              Enter
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUp;
