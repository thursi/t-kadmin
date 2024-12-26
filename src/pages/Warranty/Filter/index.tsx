import React, { useEffect, useState } from 'react';
import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import { loadBrandRequested, loadWarrantiesRequested } from 'features';

interface ICategoryTaxFilterProps {
  handleFilter?: (filter: { isActive?: boolean; warrantyName?: string }) => void;
}

export default function WarrantyFilter(props: ICategoryTaxFilterProps) {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState<{
    isActive?: boolean;
  }>({
    isActive: undefined,
  });
  const { warranties } = useSelector((state: RootState) => state.warranty);

  const isActiveOptions = [
    { name: 'All', label: 'Choose an option...', value: ' ' },
    { name: 'true', label: 'True', value: true },
    { name: 'false', label: 'False', value: false },
  ];

  const selectedValue = isActiveOptions.find(
    (option) => option.value === selectedFilters.isActive
  )?.value;

  useEffect(() => {
    dispatch(loadWarrantiesRequested());

  }, [dispatch]);

  const createOptions = (
    items: any[],
    valueKey: string = 'id',
    brandKey: string = 'warrantyName'
  ) => [
    { name: 'All', label: 'Select Option', value: ' ' },
    ...(items?.map((item) => ({
      name: `${item[brandKey]}`,
      label: `${item[brandKey]}`,
      value: item[brandKey],
    })) || []),
  ];

  const handleFilterChange = async (name: string, value: any) => {
    const newFilter = { [name]: value };
    setSelectedFilters((prev) => ({ ...prev, ...newFilter }));
    props.handleFilter?.(newFilter);
  };

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
        <div className="flex flex-col">
          <SearchDropDown
            name="warrantyName"
            options={createOptions(warranties, 'id', 'warrantyName')}
            onChange={(e) => handleFilterChange('warrantyName', e.target.value)}
            placeholder="Select Warranty Name"
            label="warrantyName:"
          />
        </div>
      </div>
    </div>
  );
}