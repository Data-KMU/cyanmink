import create from 'zustand';
import { DrawPolygonMode, EditingMode, Editor } from 'react-map-gl-draw';
import { Ref } from 'react';

const [useStore] = create((set) => ({
  mode: new EditingMode(),
  modeNr: 0,
  selectedFeatureIndex: null,
  editor: null,
  popUp: false,
  setMode: (newMode: EditingMode | DrawPolygonMode): void => set({ mode: newMode }),
  setModeNr: (newModeNr: number): void => set({ modeNr: newModeNr }),
  setSelectedFeatureIndex: (newSelectedFeatureIndex: number): void =>
    set({ selectedFeatureIndex: newSelectedFeatureIndex }),
  setEditor: (newEditor: Ref<Editor>): void => set({ editor: newEditor }),
  triggerPopUp: () => set((state) => ({ popUp: !state.popUp })),
}));

export default useStore;
