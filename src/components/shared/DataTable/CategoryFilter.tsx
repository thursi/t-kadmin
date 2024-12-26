import SearchDropDown from "pages/Products/Form/components/SearchDropDown";

interface ICategoriesFilterProps {
  filters?: any;
  handleFilter?: (featuredCategory: string) => void;
}

export default function ProductFilter(props: ICategoriesFilterProps) {
  const commonOption = { name: "Select Featured Category", value: "" };
  const featuredCategoryOption = [
    { name: "Hero", value: "HERO" },
    { name: "Thumbnail", value: "THUMBNAIL" },
    { name: "None", value: "NONE" },
  ];

  const updatedFeaturedCategoryOption = [commonOption, ...featuredCategoryOption];

  return (
    <div>
      <div className="flex mt-auto p-5 gap-20">
        <div className="flex flex-col">
          <SearchDropDown
            name="featuredCategory"
            options={updatedFeaturedCategoryOption}
            onChange={(selectedOptions) => {
              props.handleFilter?.(selectedOptions.target.value);
            }}
            placeholder="Select a featured category"
            label="Featured Category"
          />
        </div>
      </div>
    </div>
  );
}
