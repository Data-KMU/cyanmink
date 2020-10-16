import create from 'zustand';
import { GeoJsonObject, FeatureCollection } from 'geojson';

type State = {
  features: GeoJsonObject[] | [];
  coords: number[],
  addFeature: (feature: GeoJsonObject) => void;
  addFeatures: (features: FeatureCollection) => void;
  updateCoords: (coords: number[]) => void;
};

export const useMapStore = create<State>((set) => ({
  features: [],
  coords: [],
  addFeature: (feature) =>
    set((state) => ({ features: [...state.features, feature] })),
  addFeatures: (features) =>
    set((state) => ({ features: [...state.features, ...features.features] })),
  updateCoords: (newCoords) =>
    set({ coords: newCoords }),
}));
