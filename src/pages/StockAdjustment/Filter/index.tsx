import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchDropDown from 'pages/Products/Form/components/SearchDropDown';
import {
  loadProductsRequested,
  loadTaxsRequested,
  loadCitiesRequested,
  loadUnitsRequested,
  loadCategoriesRequested,
  loadBrandRequested,
  loadWarrantiesRequested,
  loadVariationsRequested,
  loadSubCategoriesRequested,
  loadBusinessLocationsRequested,
} from 'features';
import { RootState } from 'store/reducer';

interface IFilterFormProps {
  handleFilter?: (filter: Record<string, any>) => void;
}

export default function FilterStockAdjustmentsForm(props: IFilterFormProps) {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({
    isFreeShipping: undefined,
  });

  const { taxs } = useSelector((state: RootState) => state.tax);
  const { cities } = useSelector((state: RootState) => state.city);
  const { units } = useSelector((state: RootState) => state.unit);
  const { categories, subcategories } = useSelector(
    (state: RootState) => state.category
  );
  const { businessLocations } = useSelector(
    (state: RootState) => state.businessLocation
  );
  const { brands } = useSelector((state: RootState) => state.brand);
  const { warranties } = useSelector((state: RootState) => state.warranty);
  const { variations } = useSelector((state: RootState) => state.variation);
  const { products } = useSelector((state: RootState) => state.product);

  const isActiveOptions = [
    { name: 'default', label: 'Choose an option...', value: undefined },
    { name: 'true', label: 'True', value: true },
    { name: 'false', label: 'False', value: false },
  ];

  const productTypeOptions = [
    { name: 'default', label: 'Choose a Stock Transfer Status...', value: '' },
    { name: 'single', label: 'Single', value: 'SINGLE' },
    { name: 'variable', label: 'Variable', value: 'VARIABLE' },
  ];

  useEffect(() => {
    // Dispatch actions to load initial data
    dispatch(loadProductsRequested());
    dispatch(loadTaxsRequested());
    dispatch(loadCitiesRequested());
    dispatch(loadUnitsRequested());
    dispatch(loadCategoriesRequested());
    dispatch(loadBrandRequested());
    dispatch(loadWarrantiesRequested());
    dispatch(loadVariationsRequested());
    dispatch(loadSubCategoriesRequested());
    dispatch(loadBusinessLocationsRequested());
  }, [dispatch]);

  const createOptions = (
    items: any[],
    valueKey: string = 'id',
    labelKey: string = 'name'
  ) => [
    { name: 'default', label: 'Select Option', value: '' },
    ...(items?.map((item) => ({
      name: item[labelKey],
      label: item[labelKey],
      value: item[valueKey],
    })) || []),
  ];

  const handleFilterChange = (name: string, value: any) => {
    const newFilter = { [name]: value };
    setSelectedFilters((prev) => ({ ...prev, ...newFilter }));
    props.handleFilter?.(newFilter);
  };

  return (
    <div className="p-5">
      <div className="flex flex-wrap gap-10">
        <div className="flex flex-col">
          <SearchDropDown
            name="isFreeShipping"
            options={isActiveOptions}
            onChange={(selectedOption) =>
              handleFilterChange(
                'isFreeShipping',
                selectedOption.target.value === ''
                  ? undefined
                  : selectedOption.target.value
              )
            }
            placeholder="Choose an option..."
            label="is FreeShipping:"
          />
        </div>

        {/* <div className="flex flex-col">
          <SearchDropDown
            name="productId"
            options={createOptions(products)}
            onChange={(e) => handleFilterChange('productId', e.target.value)}
            placeholder="Select Product Name"
            label="Product Name:"
          />
        </div>

        <div className="flex flex-col">
          <SearchDropDown
            name="productType"
            options={productTypeOptions}
            onChange={(e) => handleFilterChange('productType', e.target.value)}
            placeholder="Choose a Stock Transfer Status..."
            label="Product Type:"
          />
        </div>

        <div className="flex flex-col">
          <SearchDropDown
            name="taxId"
            options={createOptions(taxs, 'id', 'taxName')}
            onChange={(e) => handleFilterChange('taxId', e.target.value)}
            placeholder="Select Tax Name"
            label="Tax Name:"
          />
        </div> */}

        <div className="flex flex-col">
          <SearchDropDown
            name="cityId"
            options={createOptions(cities)}
            onChange={(e) => handleFilterChange('cityId', e.target.value)}
            placeholder="Select City"
            label="City Name:"
          />
        </div>

        {/* <div className="flex flex-col">
          <SearchDropDown
            name="unitId"
            options={createOptions(units, 'id', 'unitName')}
            onChange={(e) => handleFilterChange('unitId', e.target.value)}
            placeholder="Select Unit"
            label="Unit Name:"
          />
        </div> */}

        {/* <div className="flex flex-col">
          <SearchDropDown
            name="brandId"
            options={createOptions(brands, 'id', 'brandName')}
            onChange={(e) => handleFilterChange('brandId', e.target.value)}
            placeholder="Select Brand"
            label="Brand Name:"
          />
        </div> */}

        {/* <div className="flex flex-col">
          <SearchDropDown
            name="categoryId"
            options={createOptions(categories)}
            onChange={(e) => handleFilterChange('categoryId', e.target.value)}
            placeholder="Select Category"
            label="Category Name:"
          />
        </div> */}

        {/* <div className="flex flex-col">
          <SearchDropDown
            name="subCategoryId"
            options={createOptions(subcategories)}
            onChange={(e) =>
              handleFilterChange('subCategoryId', e.target.value)
            }
            placeholder="Select Sub Category"
            label="Sub Category:"
          />
        </div>

        <div className="flex flex-col">
          <SearchDropDown
            name="businessLocationId"
            options={createOptions(businessLocations, 'id', 'businessName')}
            onChange={(e) =>
              handleFilterChange('businessLocationId', e.target.value)
            }
            placeholder="Select Business Location"
            label="Business Location:"
          />
        </div>

        <div className="flex flex-col">
          <SearchDropDown
            name="warrantyId"
            options={createOptions(warranties, 'id', 'warrantyName')}
            onChange={(e) => handleFilterChange('warrantyId', e.target.value)}
            placeholder="Select Warranty"
            label="Warranty Name:"
          />
        </div>

        <div className="flex flex-col">
          <SearchDropDown
            name="variationId"
            options={createOptions(variations, 'id', 'variationName')}
            onChange={(e) => handleFilterChange('variationId', e.target.value)}
            placeholder="Select Variation"
            label="Variation Name:"
          />
        </div> */}
      </div>
    </div>
  );
}
