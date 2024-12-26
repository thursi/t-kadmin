import SearchDropDown from "pages/Products/Form/components/SearchDropDown";

interface IProductFilterProps {
  filters?: any;
  handleFilter?: (unitId: string) => void;
}

export default function ProductFilter(props: IProductFilterProps) {
  const commonOption = { name: "ALL", value: "" };
  const unitOption = props.filters?.unit
    ? props.filters?.unit?.map((unit: any) => ({
        name: unit?.unitName,
        value: unit?.id,
      }))
    : [];

  const updatedUnitOption = [commonOption, ...unitOption];
  return (
    <div>
      <div className="flex mt-auto p-5 gap-20">
        <div className="flex flex-col">
          <SearchDropDown
            name="unitId"
            options={updatedUnitOption}
            onChange={(selectedOptions) => {
              props.handleFilter?.(selectedOptions.target.value);
            }}
            placeholder="Select a unit"
            label="Unit"
            // defaultValue={[{name: "ALL" , value: ""}]}
          />
        </div>
      </div>
      {/* <div className="flex mt-auto p-5 gap-16">
        <div className="flex flex-col">
          <label
            htmlFor="unit1"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Unit
          </label>
          <input id="unit1" name="unit1" className="border rounded px-2 py-1" />
        </div>
      </div> */}
    </div>
  );
}
