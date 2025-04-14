import { useState } from 'react';
import { FilterClassProps } from '../utils/filterClass';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: FilterClassProps;
  onApply: (selectedFilters: FilterClassProps) => void;
  appliedFilters: FilterClassProps;
}

export default function FilterModal(props: FilterModalProps) {
  const [selectedFilters, setSelectedFilters] = useState<FilterClassProps>({
    Type: [] as string[],
    Price: [] as string[],
    Tags: [] as string[],
  });

  const handleToggle = (category: 'Type' | 'Price' | 'Tags', value: string) => {
    setSelectedFilters((prev) => {
      const isSelected = prev[category].includes(value);
      const updatedCategory = isSelected
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];

      return { ...prev, [category]: updatedCategory };
    });
  };

  const handleApply = () => {
    props.onApply(selectedFilters);
    props.onClose();
  };

  const handleCancel = () => {
    setSelectedFilters(props.appliedFilters);
    props.onClose();
  }

  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 bg-white rounded-lg shadow-lg overflow-clip">
        <div className="p-4 border-b bg-marigold">
          <h2 className="text-lg font-semibold">Filter Settings</h2>
        </div>
        <div className="p-4 space-y-6">
          {(['Type', 'Price'] as const).map((category) => (
            <div key={category}>
              <h3 className="font-medium text-gray-700 capitalize">{category}</h3>
              <div className="flex-row flex flex-wrap gap-1">
                {props.options[category].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <button
                      className={selectedFilters[category].includes(option) ? "px-4 py-2 text-sm font-medium text-gray-700 bg-celeste rounded-lg hover:bg-teal-100 border-midnight border-2" : "px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"}
                      onClick={() => handleToggle(category, option)}
                    >
                      {option}
                    </button>
                    {/* <input
                      type="checkbox"
                      id={`${category}-${option}`}
                      className="form-checkbox h-4 w-4 text-blue-600"
                      checked={selectedFilters[category].includes(option)}
                      onChange={() => handleToggle(category, option)}
                    />
                    <label htmlFor={`${category}-${option}`} className="text-gray-600">
                      {option}
                    </label> */}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end p-4 border-t">
          <button
            className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-midnight rounded hover:bg-sky-800"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
