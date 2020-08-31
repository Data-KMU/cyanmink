import create from 'zustand';

const useStore = create((set) => ({
  loaded: false,
  search: '',
  setLoaded: (): void =>
    set(({ loaded }) => {
      !loaded;
    }),
  setSearch: (keyword: string): void => set({ search: keyword }),
}));

export default useStore;
