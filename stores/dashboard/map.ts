import create from 'zustand';
import { ViewportProps } from 'react-map-gl';

const [useStore] = create((set) => ({
  loaded: false,
  viewport: {},
  location: { longitude: 0, latitude: 0 },
  updateViewport: (newViewport: ViewportProps): void =>
    set(({ viewport }) => ({ viewport: { ...viewport, ...newViewport } })),
  changeLoaded: (): void => set(({ loaded }) => ({ loaded: !loaded })),
  setLocation: (loc: Record<string, number>): void => set({ location: loc }),
}));

export default useStore;
