import { Position } from 'geojson';

export type Area = {
  type: string;
  priority: number;
  extensionBehaviour: string;
  created: number;
  elevation: number;
  height: number;
  coordinates: Position | Position[] | Position[][] | Position[][][] | number[];
  properties: {
    name: string;
  };
  _id: string;
};

export type AreaInfo = { elevation: number; height: number; name: string };

export type Corridor = {
  type: string;
  priority: number;
  extensionBehaviour: string;
  created: number;
  shape: string;
  coordinates: Position | Position[] | Position[][] | Position[][][] | number[];
  properties: {
    name: string;
  };
  _id: string;
};
