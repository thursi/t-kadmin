import React, { useEffect, useState } from 'react';
import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/reducer';
import { loadBrandRequested, loadBusinessLocationsRequested } from 'features';

// interface ICategoryTaxFilterProps {
//   handleFilter?: (filter: { isActive?: boolean; businessLocationId?: string }) => void;
// }

interface ICategoryTaxFilterProps {
  handleFilter?: (filter: Record<string, any>) => void;
}

export default function OrderFilter(props: ICategoryTaxFilterProps) {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState<{
    orderDate?: any;
    businessLocationId?:string;
  }>({
    orderDate: undefined,
    businessLocationId:undefined
  });
  const { businessLocations } = useSelector(
    (state: RootState) => state.businessLocation
  );
  const isActiveOptions = [
    { name: 'All', label: 'Choose an option...', value: ' ' },
    { name: 'true', label: 'True', value: true },
    { name: 'false', label: 'False', value: false },
  ];


  useEffect(() => {
    dispatch(loadBusinessLocationsRequested());
  }, [dispatch]);

  const createOptions = (
    items: any[],
    valueKey: string = 'id',
    brandKey: string = 'businessName'
  ) => [
    { name: 'All', label: 'Select Option', value: ' ' },
    ...(items?.map((item) => ({
      name: `${item[brandKey]}`,
      label: `${item[brandKey]}`,
      value: item[valueKey],
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
          <label className="mb-0">Date:</label>
          <input
            type="date"
            name="date"
            className="border rounded text-sm"
            onChange={(e) => handleFilterChange('orderDate', e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <SearchDropDown
            name="businessLocationId"
            options={createOptions(businessLocations, 'id', 'businessName')}
            onChange={(e) => handleFilterChange('businessLocationId', e.target.value)}
            placeholder="Select Business Name"
            label="BusinessName:"
          />
        </div>
      </div>
    </div>
  );
}