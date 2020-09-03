import { LineStringCoordinates, PolygonCoordinates } from '@nebula.gl/edit-modes';

export type Area = {
  type: string;
  priority: number;
  extensionBehaviour: string;
  created: number;
  elevation: number;
  height: number;
  coordinates: PolygonCoordinates | LineStringCoordinates | Position[] | Position[][];
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
  coordinates: PolygonCoordinates | LineStringCoordinates | Position[] | Position[][];
  properties: {
    name: string;
  };
  _id: string;
};
