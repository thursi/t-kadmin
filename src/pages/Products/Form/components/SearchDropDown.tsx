import React, { useState, useMemo, useEffect, useRef } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";

export interface ISearchDropDownProps {
  name?: string;
  label?: string;
  onChange?: (selectedOptions: any) => void;
  inputOnChange?: (value: any) => void;
  value?: any;
  errors?: any;
  touches?: any;
  onBlur?: any;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  options?: { name: string; value: any }[]; // Define your option type
  multiSelect?: boolean; // New prop to enable/disable multi-selection
  defaultValue?: { name: string; value: any }[];
  remove?: any;
  required?: any;
  tooltip?: any;
  color?: any;
  optionsFromAPI?: { name: string; value: any }[];
}

const SearchDropDown = (props: ISearchDropDownProps) => {
  const options = props?.options || [];
  const optionsFromAPI = props?.optionsFromAPI || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<
    { name: string; value: any }[]
  >(
    props?.defaultValue?.length === 0
      ? []
      : props?.options?.filter((option: any) =>
          props?.defaultValue?.includes(option.value)
        )!
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (props.value) {
  //     const selectedOptionValue = props.value;
  //     const selectedOption = options?.find(
  //       (option: any) => option.value === selectedOptionValue
  //     );
  //     if (selectedOption) {
  //       setSelectedOptions([selectedOption]);
  //     }
  //   } else if (props.defaultValue) {
  //     // If no Formik value, fallback to defaultValue
  //     setSelectedOptions(
  //       props?.options?.filter((option: any) =>
  //         props?.defaultValue?.includes(option.value)
  //       ) || []
  //     );
  //   } else {
  //     setSelectedOptions([]); // Clear selected options if no value is found
  //   }
  // }, [props.value, props.name, options, props.defaultValue]);

 
  useEffect(() => {
    if (props.value) {
      // Set input and selected options based on the current value
      const selectedOption = options?.find(
        (option: any) => option.value === props.value
      );
      if (selectedOption) {
        setSelectedOptions([selectedOption]);
        setInputValue(selectedOption.name); // Display selected option name
      }
    } else if (props.defaultValue) {
      // If no value, fallback to defaultValue
      const defaultOptions = props?.options?.filter((option: any) =>
        props.defaultValue?.includes(option.value)
      );
      setSelectedOptions(defaultOptions || []);
      setInputValue(defaultOptions?.map((opt) => opt.name).join(", ") || ""); // Display default options names
    } else {
      setSelectedOptions([]);
      setInputValue(""); // Clear the input if no default or value is provided
    }
  }, [props.value, props.defaultValue, options]);
  
 
 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const filteredOptions = useMemo(() => {
    return options?.filter((option: any) =>
      option?.name?.toLowerCase()?.includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, options]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setInputValue(e.target.value);
    props.inputOnChange && props.inputOnChange(e.target.value);
  };

  const handleOptionClick = (option: { name: string; value: any }) => {
    if (props?.multiSelect) {
      setSelectedOptions([...selectedOptions, option]);
      setInputValue("");
    } else {
      setSelectedOptions([option]);
      setInputValue(option.name);
    }
    setSearchTerm("");
    setShowDropdown(false);

    if (props.onChange) {
      props.onChange({
        target: {
          name: props?.name ?? option?.name,
          value: props?.multiSelect
            ? [...props?.value, option?.value]
            : option?.value,
        },
      });
    }
  };

  const handleRemoveOption = (val?: any) => {
    if (props?.multiSelect) {
      if (val) {
        setSelectedOptions(
          selectedOptions.filter((option: any) => option.value !== val)
        );
        return;
      } else {
        setInputValue("");
        setSearchTerm("");
      }

      // Update Formik's state when the option is removed
      if (props.onChange) {
        if (val) {
          props.onChange({
            target: {
              name: props.name,
              value: props?.value.filter((value: any) => value !== val),
            },
          });
          return;
        }

        props.onChange({
          target: {
            name: props.name,
            value: [],
          },
        });
      }
    } else {
      if (props.onChange) {
        props.onChange({
          target: {
            name: props.name,
            value: undefined, // Reset the value in Formik when removed
          },
        });
      }
      setSelectedOptions([]);
      setSearchTerm("");
      setInputValue("");
    }
  };

  const handleRemoveInputValue = () => {};

  return (
    <div
      className={`flex flex-col max-w-full w-full ${props.label && "gap-2"} ${
        props.className || ""
      }`}
      ref={dropdownRef}
    >
      <label
        htmlFor={props.name}
        className={`text-[13px] font-bold  ${props?.color ? props?.color : 'text-black'} `}
      >
        {props.label}
        {props.required && <span className="text-red-500 text-sm">*</span>}
        {props.tooltip && (
          <a
            // href="#"
            className="text-primary dark:text-primary-400 self-center ml-1"
            data-twe-toggle="tooltip"
            title={props.tooltip}
          >
            <RiErrorWarningFill size={15} />
          </a>
        )}
      </label>

      <div className="relative w-full grow">
        {/* Search Input */}
        <div
          className={`relative flex no-scrollbar justify-stretch overflow-x-auto w-full h-9 border border-gray-300 rounded focus:outline-none focus:ring-2 `}
        >
          {searchTerm ? (
            <div
              onClick={() => handleRemoveOption("")}
              className="absolute right-2 cursor-pointer -translate-y-1/2 top-1/2"
            >
              x
            </div>
          ) : (
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className={`absolute right-2 cursor-pointer -translate-y-1/2 top-1/2 transition-transform duration-300 ${
                showDropdown ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </div>
          )}

          {/* <div> */}
          {/* <div id="" className="flex items-center p-1 gap-1 h-full"> */}
          {props.multiSelect && selectedOptions.length > 0 && (
            <div className="flex items-center border-0 outline-none justify-center p-1 py-2 gap-1">
              {selectedOptions?.map((option: any) => (
                <div
                  key={option?.value}
                  className="flex w-fit h-6 items-center gap-1 justify-between px-2 py-1 bg-primary text-white rounded"
                >
                  <span className="text-nowrap">{option.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(option.value)}
                    className="text-lg font-bold cursor-pointer hover:text-red-500"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          {/* </div> */}
          <input
            type="text"
            id={props.name}
            name={props.name}
            value={
              inputValue
            }
            onClick={() => setShowDropdown(!showDropdown)}
            onChange={handleSearchChange}
            onBlur={props.onBlur}
            disabled={props.disabled}
            placeholder={props.placeholder || "Search..."}
            className={`p-2 focus:outline-none  text-sm w-full bg-transparent border-0 outline-none m-0`}
            autoComplete="off"
          />
        </div>
        {/* Dropdown */}
        {showDropdown &&
          (filteredOptions?.length || optionsFromAPI?.length) > 0 && (
            <ul className="absolute z-10 mt-1 max-h-40 w-full bg-white border border-gray-300 rounded shadow-lg overflow-y-auto no-scrollbar">
              {(filteredOptions?.length ? filteredOptions : optionsFromAPI).map(
                (option: any) => (
                  <li
                    key={option.value}
                    onClick={() => {
                      if (
                        selectedOptions?.some((o) => o.value === option.value)
                      ) {
                        handleRemoveOption(option.value);
                        return;
                      }
                      handleOptionClick(option);
                    }}
                    className="cursor-pointer flex p-2 hover:bg-indigo-600 hover:text-white relative"
                  >
                    {option.name}
                    {selectedOptions?.some((o) => o.value === option.value) && (
                      <div className="w-3 h-3 absolute right-2 -translate-y-1/2 top-1/2 cursor-pointer align-middle text-center">
                        <TiTick />
                      </div>
                    )}
                  </li>
                )
              )}
            </ul>
          )}

        {/* No options message */}
        {showDropdown &&
          !filteredOptions?.length &&
          !optionsFromAPI?.length && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg p-2">
              No options available!
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchDropDown;