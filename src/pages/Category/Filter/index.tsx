import React, { useState } from 'react';
import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';

interface ICategoryTaxFilterProps {
  handleFilter?: (filter: { featuredCategory?: string }) => void;
}

export default function CategoryFilter(props: ICategoryTaxFilterProps) {
  const [selectedFilters, setSelectedFilters] = useState<{
    featuredCategory?: string;
  }>({
    featuredCategory: undefined,
  });

  const isActiveOptions = [
    { name: 'All', label: 'Choose an option...', value: ' ' },
    { name: 'Hero', label: 'Hero', value: 'HERO' },
    { name: 'Thumbnail', label: 'Thumbnail', value: 'THUMBNAIL' },
    { name: 'None', label: 'None', value: 'NONE' },

  ];



  const selectedValue = isActiveOptions.find(
    (option) => option.value === selectedFilters.featuredCategory
  )?.value;

  

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-10">
        <div className="flex flex-col">
          <SearchDropDown
            name="featuredCategory"
            options={isActiveOptions}
            onChange={(selectedOption) => {
              console.log('Selected Option:', selectedOption.target.value);
              props.handleFilter?.({
                featuredCategory: selectedOption.target.value,
              });
            }}
            value={selectedValue}
            placeholder="Choose an option..."
            label="Featured Category :"
          />
        </div>
      </div>
    </div>
  );
}
