import React, { useState } from 'react';
import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';

interface ICategoryTaxFilterProps {
  handleFilter?: (filter: { isActive?: boolean }) => void;
}

export default function SuppliersFilter(props: ICategoryTaxFilterProps) {
  const [selectedFilters, setSelectedFilters] = useState<{
    isActive?: boolean;
  }>({
    isActive: undefined,
  });

  const isActiveOptions = [
    { name: 'All', label: 'Choose an option...', value: ' ' },
    { name: 'true', label: 'True', value: true },
    { name: 'false', label: 'False', value: false },
  ];

  // const updateFilters = (newFilter: { isActive?: boolean }) => {
  //   const updatedFilters = { ...selectedFilters, ...newFilter };
  //   setSelectedFilters(updatedFilters);

  //   // Ensure the filter is passed only if it's defined
  //   if (updatedFilters.isActive !== undefined) {
  //     props.handleFilter?.(updatedFilters);
  //   }

  //   console.log('Updated Filters:', updatedFilters);
  // };

  const selectedValue = isActiveOptions.find(
    (option) => option.value === selectedFilters.isActive
  )?.value;

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-10">
        <div className="flex flex-col">
          <SearchDropDown
            name="isActive"
            options={isActiveOptions}
            onChange={(selectedOption) => {
              console.log('Selected Option:', selectedOption.target.value);
              props.handleFilter?.({
                isActive: selectedOption.target.value,
              });
            }}
            value={selectedValue}
            placeholder="Choose an option..."
            label="Status :"
          />
        </div>
      </div>
    </div>
  );
}
