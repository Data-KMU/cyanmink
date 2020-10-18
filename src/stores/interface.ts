import create from 'zustand';

type State = {
  loaded: boolean;
  setLoaded: () => void;
};

export const useInterfaceStore = create<State>((set) => ({
  loaded: false,
  setLoaded: () =>
    set({ loaded: true }),
}));
