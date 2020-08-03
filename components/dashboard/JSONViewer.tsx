import { useState } from 'react';

import useMapStore from '../../stores/dashboard/map';

const JSONViewer: React.FC = () => {
  const { features } = useMapStore();
  const [active, setActive] = useState(false);

  return (
    <>
      {active && (
        <div className="overflow-scroll bg-white rounded-lg shadow-xl p-4 m-2 text-xs">
          <pre>{JSON.stringify(features, undefined, 2)}</pre>
        </div>
      )}
      <button
        className="self-end bg-white rounded-lg shadow-xl p-4 m-2"
        onClick={() => setActive(!active)}
      >
        JSON
      </button>
    </>
  );
};

export default JSONViewer;
