import useInterfaceStore from '../../stores/dashboard/interface';

const FeatureSearch = (): JSX.Element => {
  const { setSearch } = useInterfaceStore();

  return (
    <div className="px-4 py-2">
      <input
        type="text"
        placeholder="Suche"
        className="w-full"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default FeatureSearch;
