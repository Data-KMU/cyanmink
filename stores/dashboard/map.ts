import create from 'zustand';
import { ViewportProps } from 'react-map-gl';
import { Feature, Position } from '@turf/helpers';
import { Geometry } from 'geojson';

export type Area = {
  type: string;
  priority: number;
  extensionBehaviour: string;
  created: number;
  elevation: number;
  height: number;
  coordinates: Position | Position[] | Position[][] | Position[][][] | Geometry;
  _id: string;
  properties: {
    name: string;
  };
};

type Info = { elevation: number; height: number; name: string };

const generateUUID = (): string => {
  let d = new Date().getTime();
  let d2 = (performance && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const filterObject = (feature: Feature): Area => {
  return {
    type: 'Area',
    priority: 1000,
    extensionBehaviour: 'trafficZone',
    created: Date.now(),
    elevation: 0,
    height: 0,
    coordinates: 'coordinates' in feature.geometry ? feature.geometry.coordinates : [],
    _id: generateUUID(),
    properties: {
      name: feature.properties && feature.properties.name ? feature.properties.name : 'Area',
    },
  };
};

const updateCoordinates = (features: Array<Area>, index: number, feature: Feature): Array<Area> => {
  const newAreas = [...features];
  'coordinates' in feature.geometry
    ? (newAreas[index].coordinates = feature.geometry.coordinates)
    : null;

  return newAreas;
};

const updateInfos = (features: Array<Area>, index: number, info: Info): Array<Area> => {
  const newAreas = [...features];
  newAreas[index].height = info.height;
  newAreas[index].elevation = info.elevation;
  newAreas[index].properties.name = info.name;

  return newAreas;
};

const removeFeature = (features: Array<Area>, index: number) => {
  const copy = [...features];
  copy.splice(index, 1);
  return copy;
};

const useStore = create((set) => ({
  viewport: {},
  location: { longitude: 0, latitude: 0 },
  features: [],
  updateViewport: (newViewport: ViewportProps): void =>
    set(({ viewport }) => ({ viewport: { ...viewport, ...newViewport } })),
  setLocation: (loc: Record<string, number>): void => set({ location: loc }),
  setFeatures: (areas: Area[]): void => set({ features: areas }),
  addFeature: (feature: Feature): void =>
    set((state) => state.features.push(filterObject(feature))),
  updateCoordinates: (index: number, feature: Feature): void =>
    set(({ features }) => ({
      features: updateCoordinates(features, index, feature),
    })),
  updateInfos: (index: number, info: Info): void =>
    set(({ features }) => ({
      features: updateInfos(features, index, info),
    })),
  deleteFeature: (index: number): void =>
    set(({ features }) => ({
      features: removeFeature(features, index),
    })),
}));

export default useStore;
