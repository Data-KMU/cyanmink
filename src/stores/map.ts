import create from 'zustand';
import { GeoJsonObject } from 'geojson';

type State = {
  features: GeoJsonObject[] | [];
  addFeature: (feature: GeoJsonObject) => void;
};

export const useMapStore = create<State>((set) => ({
  features: [],
  addFeature: (feature) =>
    set((state) => ({ features: [...state.features, feature] })),
}));
