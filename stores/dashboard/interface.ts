import create from 'zustand';

const [useStore] = create((set) => ({
  loaded: false,
  setLoaded: (loaded: boolean): void => set({ loaded: loaded }),
}));

export default useStore;
