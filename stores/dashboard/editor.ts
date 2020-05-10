import create from 'zustand';
import { DrawPolygonMode, EditingMode } from 'react-map-gl-draw';

const [useStore] = create((set) => ({
  mode: new EditingMode(),
  modeNr: 0,
  setMode: (newMode: EditingMode | DrawPolygonMode): void => set({ mode: newMode }),
  setModeNr: (newModeNr: number): void => set({ modeNr: newModeNr }),
}));

export default useStore;
