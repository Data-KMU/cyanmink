import create from 'zustand';
import { ViewportProps } from 'react-map-gl';
import { Feature, Position } from '@turf/helpers';

type Area = {
  type: string;
  priority: number;
  extensionBehaviour: string;
  created: number;
  validFrom: number;
  validUntil: number;
  actuators: Record<string, unknown>;
  sensors: null;
  samplers: null;
  elevation: number;
  height: number;
  coordinates: Position | Position[] | Position[][] | Position[][][];
  _id: string;
};

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

const filterObject = (features: Array<Feature>): Array<Area> => {
  return features.map((feature) => {
    return {
      type: 'Area',
      priority: 1000,
      extensionBehaviour: 'trafficZone',
      created: Date.now(),
      validFrom: Date.now(),
      validUntil: Date.now(),
      actuators: {},
      sensors: null,
      samplers: null,
      elevation: 123.0,
      height: 456.0,
      coordinates: 'coordinates' in feature.geometry ? feature.geometry.coordinates : [],
      _id: generateUUID(),
    };
  });
};

const updateArea = (features: Array<Area>, index: number, feature: Feature): Array<Area> => {
  const newAreas = [...features];
  'coordinates' in feature.geometry
    ? (newAreas[index].coordinates = feature.geometry.coordinates)
    : null;

  return newAreas;
};

const removeFeature = (features: Array<Area>, index: number) => {
  const copy = [...features];
  copy.splice(index, 1);
  return copy;
};

const [useStore] = create((set) => ({
  loaded: true,
  viewport: {},
  location: { longitude: 0, latitude: 0 },
  features: [],
  updateViewport: (newViewport: ViewportProps): void =>
    set(({ viewport }) => ({ viewport: { ...viewport, ...newViewport } })),
  changeLoaded: (): void => set(({ loaded }) => ({ loaded: !loaded })),
  setLocation: (loc: Record<string, number>): void => set({ location: loc }),
  addFeature: (featureArr: Array<Feature>): void => set({ features: filterObject(featureArr) }),
  updateFeature: (index: number, feature: Feature): void =>
    set(({ features }) => ({
      features: updateArea(features, index, feature),
    })),
  deleteFeature: (index: number): void =>
    set(({ features }) => ({
      features: removeFeature(features, index),
    })),
}));

export default useStore;
