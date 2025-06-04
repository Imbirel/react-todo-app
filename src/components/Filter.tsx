import type { FilterType } from '../types/todoTypes';

type FilterProps = {
  activeFilter: FilterType;
  setFilter: (filter: FilterType) => void;
};

export function Filter({ activeFilter, setFilter }: FilterProps) {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="flex space-x-2">
      {filters.map((filterType) => (
        <button
          key={filterType}
          onClick={() => setFilter(filterType)}
          className={`rounded px-2 py-1 text-sm capitalize ${
            activeFilter === filterType
              ? 'border border-accentcolor text-accentcolor'
              : 'text-gray-500 hover:text-accentcolor dark:text-gray-300'
          }`}
        >
          {filterType}
        </button>
      ))}
    </div>
  );
}