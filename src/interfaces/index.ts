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

export type AreaInfo = {
  elevation?: number;
  height?: number;
  extensionBehaviour?: string;
  priority?: number;
  properties?: {
    name: string;
  };
};

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

export type Coords = {
  longitude: number;
  latitude: number;
}

export type PurpleTigerRes = {
  spatialEntities: any[],
  longitude: number,
  latitude: number,
  altitude: null,
  created: number
}
