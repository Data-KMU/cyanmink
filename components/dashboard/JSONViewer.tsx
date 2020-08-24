import { useState } from 'react';

import useMapStore from '../../stores/dashboard/map';

const JSONViewer: React.FC = () => {
  const { features } = useMapStore();
  const [active, setActive] = useState(false);

  return (
    <div className="ml-2 mt-2">
      {active && (
        <div
          className="overflow-x-hidden overflow-y-scroll shadow-xl bg-white rounded-lg p-4 text-xs pointer-events-auto mb-2"
          style={{ height: '50vh' }}
        >
          <pre>{JSON.stringify(features, undefined, 2)}</pre>
        </div>
      )}
      <button
        className="self-end bg-white rounded-lg p-4 shadow-xl pointer-events-auto"
        onClick={() => setActive(!active)}
      >
        JSON
      </button>
    </div>
  );
};

export default JSONViewer;
