import React, { useEffect, useState } from 'react';
import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
import { loadTaxsRequested } from 'features';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import axios from 'axios';

interface ITaxFilterProps {
  handleFilter?: (filter: { tax?: number }) => void;
}

export default function TaxFilter(props: ITaxFilterProps) {
  const { taxs } = useSelector((state: RootState) => state.tax);
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState<{
    tax?: number;
  }>({
    tax: undefined,
  });

  useEffect(() => {
    dispatch(loadTaxsRequested());
  }, [dispatch]);

  const createOptions = (
    items: any[],
    valueKey: string = 'id',
    taxKey: string = 'tax'
  ) => [
    { name: 'All', label: 'Select Option', value: ' ' },
    ...(items?.map((item) => ({
      name: `${item[taxKey]}%`,
      label: `${item[taxKey]}%`,
      value: item[taxKey],
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
            name="tax"
            options={createOptions(taxs, 'id', 'tax')}
            onChange={(e) => handleFilterChange('tax', e.target.value)}
            placeholder="Select Tax"
            label="Tax:"
          />
        </div>
      </div>
    </div>
  );
}
