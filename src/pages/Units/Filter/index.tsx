import React, { useEffect, useState } from 'react';
import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
import {  loadUnitsRequested } from 'features';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import axios from 'axios';

interface ITaxFilterProps {
  handleFilter?: (filter: { uniCode?: string }) => void;
}

export default function UnitFilter(props: ITaxFilterProps) {
  const { units } = useSelector((state: RootState) => state.unit);

  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState<{
    uniCode?: string;
  }>({
    uniCode: undefined,
  });

  useEffect(() => {
    dispatch(loadUnitsRequested());
  }, [dispatch]);

  const createOptions = (
    items: any[],
    valueKey: string = 'id',
    unitKey: string = 'uniCode'
  ) => [
    { name: 'All', label: 'Select Option', value:' '},
    ...(items?.map((item) => ({
      name: `${item[unitKey]}`,
      label: `${item[unitKey]}`,
      value: item[unitKey],
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
            name="uniCode"
            options={createOptions(units, 'id', 'uniCode')}
            onChange={(e) => handleFilterChange('uniCode', e.target.value)}
            placeholder="Select uniCode"
            label="UniCode:"
          />
        </div>
      </div>
    </div>
  );
}
