import create from 'zustand';
import { ViewportProps } from 'react-map-gl';
import { Feature } from '@turf/helpers';

const [useStore] = create((set) => ({
  loaded: true,
  viewport: {},
  location: { longitude: 0, latitude: 0 },
  features: [],
  updateViewport: (newViewport: ViewportProps): void =>
    set(({ viewport }) => ({ viewport: { ...viewport, ...newViewport } })),
  changeLoaded: (): void => set(({ loaded }) => ({ loaded: !loaded })),
  setLocation: (loc: Record<string, number>): void => set({ location: loc }),
  addFeature: (featureCollection: Array<Feature>): void =>
    set(({ features }) => ({ features: [...features, ...featureCollection] })),
}));

export default useStore;
