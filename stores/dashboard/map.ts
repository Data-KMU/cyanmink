import create from 'zustand';
import { ViewportProps } from 'react-map-gl';
import { Feature } from 'geojson';
import { Area, AreaInfo, Corridor } from '../../interfaces';

const featureConverter = (feature: Feature, type: string): Area | Corridor | undefined => {
  switch (type) {
    case 'Area': {
      return {
        type: 'Area',
        priority: 1000,
        extensionBehaviour: 'trafficZone',
        created: Date.now(),
        elevation: 0,
        height: 0,
        coordinates: 'coordinates' in feature.geometry ? feature.geometry.coordinates : [],
        properties: {
          name: feature.properties && feature.properties.name ? feature.properties.name : 'Area',
        },
      };
    }
    case 'Corridor': {
      return {
        type: 'Corridor',
        priority: 1000,
        extensionBehaviour: 'trafficZone',
        created: Date.now(),
        shape: 'circular',
        coordinates: 'coordinates' in feature.geometry ? feature.geometry.coordinates : [],
        properties: {
          name:
            feature.properties && feature.properties.name ? feature.properties.name : 'Corridor',
        },
      };
    }
    default: {
      console.error('Not a valid type');
      break;
    }
  }
};

const updateCoordinates = (features: Array<Area>, index: number, feature: Feature): Area[] => {
  const featureArrayCopy = [...features];

  'coordinates' in feature.geometry
    ? (featureArrayCopy[index].coordinates = feature.geometry.coordinates)
    : null;

  return featureArrayCopy;
};

const updateInfos = (features: Array<Area>, index: number, info: AreaInfo): Area[] => {
  const featureArrayCopy = [...features];

  featureArrayCopy[index] = { ...featureArrayCopy[index], ...info };

  return featureArrayCopy;
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
  addGeoFeature: (feature: Feature, type: string): void =>
    set((state) => state.features.push(featureConverter(feature, type))),
  addSpatialFeature: (feature: Area | Corridor): void =>
    set((state) => state.features.push(feature)),
  updateCoordinates: (index: number, feature: Feature): void =>
    set(({ features }) => ({
      features: updateCoordinates(features, index, feature),
    })),
  updateInfos: (index: number, info: AreaInfo): void =>
    set(({ features }) => ({
      features: updateInfos(features, index, info),
    })),
  deleteFeature: (index: number): void =>
    set(({ features }) => ({
      features: removeFeature(features, index),
    })),
}));

export default useStore;
