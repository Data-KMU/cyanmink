import create from 'zustand';
import { DrawLineStringMode, DrawPolygonMode, EditingMode, Editor } from 'react-map-gl-draw';
import { Ref } from 'react';

const useStore = create((set) => ({
  mode: new EditingMode(),
  modeNr: 0,
  selectedFeatureIndex: null,
  editor: null,
  setMode: (newMode: EditingMode | DrawPolygonMode | DrawLineStringMode): void =>
    set({ mode: newMode }),
  setModeNr: (newModeNr: number): void => set({ modeNr: newModeNr }),
  setSelectedFeatureIndex: (newSelectedFeatureIndex: number): void =>
    set({ selectedFeatureIndex: newSelectedFeatureIndex }),
  setEditor: (newEditor: Ref<Editor>): void => set({ editor: newEditor }),
}));

export default useStore;
