import create from 'zustand';

type State = {
  loaded: boolean;
  toggleLoaded: () => void;
};

export const useInterfaceStore = create<State>((set) => ({
  loaded: false,
  toggleLoaded: () =>
    set((state) => ({ loaded: !state.loaded })),
}));
