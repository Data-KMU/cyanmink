import { useState } from 'react';

import useMapStore from '../../stores/dashboard/map';

const JSONViewer: React.FC = () => {
  const { features } = useMapStore();
  const [active, setActive] = useState(false);

  return (
    <div className="ml-2 mt-2">
      {active && (
        <div
          className="overflow-x-hidden overflow-y-scroll shadow-xl bg-white rounded-lg p-4 text-xs pointer-events-auto mb-2 z-0"
          style={{ height: '50vh' }}
        >
          <pre>{JSON.stringify(features, undefined, 2)}</pre>
        </div>
      )}
      <div className="flex justify-between">
        <button
          className="self-end bg-white rounded-lg p-4 shadow-xl pointer-events-auto mr-2 z-10"
          onClick={() => setActive(!active)}
        >
          JSON
        </button>
        <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(features, null, 2),
          )}`}
          download="areas.json"
          className="z-10"
        >
          <button className="self-end bg-white rounded-lg p-4 shadow-xl pointer-events-auto">
            Download JSON
          </button>
        </a>
      </div>
    </div>
  );
};

export default JSONViewer;
