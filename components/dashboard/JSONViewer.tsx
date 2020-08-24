import { useState } from 'react';

import useMapStore from '../../stores/dashboard/map';

const JSONViewer: React.FC = () => {
  const { features } = useMapStore();
  const [active, setActive] = useState(false);

  return (
    <div className="ml-2 mt-2">
      {active && (
        <div className="overflow-scroll bg-white rounded-lg p-4 text-xs">
          <pre>{JSON.stringify(features, undefined, 2)}</pre>
        </div>
      )}
      <button className="self-end bg-white rounded-lg p-4" onClick={() => setActive(!active)}>
        JSON
      </button>
    </div>
  );
};

export default JSONViewer;
