import create from 'zustand';
import { Feature, FeatureCollection } from '../interfaces';

type State = {
  features: Feature[] | [];
  coords: number[],
  addFeature: (feature: Feature) => void;
  addFeatures: (features: FeatureCollection) => void;
  updateCoords: (coords: number[]) => void;
  updateFeatureCoords: (feature: Feature) => void;
};

function updateCoords(state: Feature[], feature: Feature) {
  const stateCopy = [...state];
  const featureID = stateCopy.findIndex(x => x.id === feature.id);

  stateCopy[featureID].geometry.coordinates = feature.geometry.coordinates;

  return stateCopy;
}

export const useMapStore = create<State>((set) => ({
  features: [],
  coords: [],
  addFeature: (feature) =>
    set((state) => ({ features: [...state.features, feature] })),
  addFeatures: (features) =>
    set((state) => ({ features: [...state.features, ...features.features] })),
  updateCoords: (newCoords) =>
    set({ coords: newCoords }),
  updateFeatureCoords: (feature) =>
    set((state) => ({ features: updateCoords(state.features, feature) })),
}));
