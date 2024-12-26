import React, { useState, useMemo, useEffect } from "react";
import { TiTick } from "react-icons/ti";

export interface ISearchDropDownProps {
  name: string;
  label?: string;
  onChange?: (selectedOptions: any) => void;
  values?: any;
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
}

const SearchDropDown = (props: ISearchDropDownProps) => {
  const isInvalid = useMemo(() => {
    return props?.touches?.[props?.name] && props?.errors?.[props?.name];
  }, [props?.touches, props?.errors, props?.name]);

  const [options] = useState(props?.options || []);
  const [searchTerm, setSearchTerm] = useState("");
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

  // Synchronize selectedOptions with Formik values or defaultValue
  useEffect(() => {
    if (props.values && props.values[props.name]) {
      const selectedOptionValue = props.values[props.name];
      const selectedOption = options.find(
        (option: any) => option.value === selectedOptionValue
      );
      if (selectedOption) {
        setSelectedOptions([selectedOption]);
      }
    } else if (props.defaultValue) {
      // If no Formik value, fallback to defaultValue
      setSelectedOptions(
        props?.options?.filter((option: any) =>
          props?.defaultValue?.includes(option.value)
        ) || []
      );
    } else {
      setSelectedOptions([]); // Clear selected options if no value is found
    }
  }, [props.values, props.name, options, props.defaultValue]);

  const filteredOptions = useMemo(() => {
    return options.filter((option: any) =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, options]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionClick = (option: { name: string; value: any }) => {
    if (props?.multiSelect) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions([option]);
    }
    setSearchTerm("");
    setShowDropdown(false);

    if (props.onChange) {
      props.onChange({
        target: {
          name: props.name,
          value: props?.multiSelect
            ? [...props?.values?.[props?.name], option?.value]
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
        props?.remove(val);
        return;
      }
      setSelectedOptions([]);

      // Update Formik's state when the option is removed
      if (props.onChange) {
        if (val) {
          props.onChange({
            target: {
              name: props.name,
              value: props?.values?.[props?.name].filter(
                (value: any) => value !== val
              ),
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
    }
  };

  return (
    <div
      className={`flex flex-col max-w-full w-full gap-2 ${
        props.className || ""
      }`}
    >
      <label
        htmlFor={props.name}
        className={`text-[11px] font-bold text-black ${
          props?.disabled ? "hidden" : ""
        }`}
      >
        {props.label}
      </label>

      <div className="relative w-full grow">
        {/* Search Input */}
        <div
          className={`relative flex no-scrollbar justify-stretch overflow-x-auto w-full h-full border border-gray-300 rounded focus:outline-none focus:ring-2 ${
            isInvalid ? "border-red-500" : ""
          }`}
        >
          {selectedOptions.length > 0 && !props?.multiSelect && (
            <div
              onClick={handleRemoveOption}
              className="absolute right-2 cursor-pointer -translate-y-1/2 top-1/2"
            >
              x
            </div>
          )}
          <div className="flex items-center p-1 gap-1 h-full">
            {selectedOptions.length > 0 && (
              <>
                {selectedOptions?.map((option: any) => (
                  <div
                    key={option?.value}
                    className="flex w-fit h-full items-center gap-1 justify-between min-w-14 px-2 py-1 bg-primary text-white rounded"
                  >
                    <span className="text-nowrap">{option.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(option.value)}
                      className="text-xs font-bold cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
          <input
            type="text"
            id={props.name}
            name={props.name}
            value={searchTerm}
            onClick={() => setShowDropdown(!showDropdown)}
            onChange={handleSearchChange}
            onBlur={props.onBlur}
            disabled={props.disabled}
            placeholder={props.placeholder || "Search..."}
            className={`p-2 outline-none w-full border-none focus:outline-none focus:ring-0 ${props?.disabled ? "pointer-events-none cursor-default" : ""}`}
          />
        </div>
        {/* Dropdown */}
        {showDropdown && filteredOptions.length > 0 && (
          <ul className="absolute z-10 mt-1 max-h-40 w-full bg-white border border-gray-300 rounded shadow-lg overflow-y-auto no-scrollbar">
            {filteredOptions.map((option: any) => (
              <li
                key={option.value}
                onClick={() => {
                  if (selectedOptions.some((o) => o.value === option.value)) {
                    handleRemoveOption(option.value);
                    return;
                  }
                  handleOptionClick(option);
                }}
                className="cursor-pointer flex p-2 hover:bg-indigo-600 hover:text-white relative"
              >
                {option.name}
                {selectedOptions.some((o) => o.value === option.value) && (
                  <div className="w-3 h-3 absolute right-2 -translate-y-1/2 top-1/2 cursor-pointer align-middle text-center">
                    <TiTick />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* No options message */}
        {showDropdown && filteredOptions.length === 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg p-2">
            No options available!
          </div>
        )}
      </div>

      {/* Validation Error */}
      {isInvalid && (
        <p className="text-red-500 font-[600] text-[10px]">
          {props?.errors?.[props?.name]}
        </p>
      )}
    </div>
  );
};

export default SearchDropDown;


// import React, { useState, useMemo, useEffect } from "react";
// import { TiTick } from "react-icons/ti";

// export interface ISearchDropDownProps {
//   name: string;
//   label?: string;
//   onChange?: (selectedOptions: any) => void;
//   values?: any;
//   errors?: any;
//   touches?: any;
//   onBlur?: any;
//   disabled?: boolean;
//   className?: string;
//   placeholder?: string;
//   options?: { name: string; value: any }[]; // Define your option type
//   multiSelect?: boolean; // New prop to enable/disable multi-selection
//   defaultValue?: { name: string; value: any }[];
//   remove?: any;
// }

// const SearchDropDown = (props: ISearchDropDownProps) => {

//   console.log("values.......................praveen......",props.values);
//   console.log("multiSelect.....................praveen........",props.defaultValue);

//   const isInvalid = useMemo(() => {
//     return props?.touches?.[props?.name] && props?.errors?.[props?.name];
//   }, [props?.touches, props?.errors, props?.name]);

//   const [options] = useState(props?.options || []);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedOptions, setSelectedOptions] = useState<
//     { name: string; value: any }[]
//   >(
//     props?.defaultValue?.length === 0
//       ? []
//       : props?.options?.filter((option: any) =>
//           props?.defaultValue?.includes(option.value)
//         )!
//   );
//   const [showDropdown, setShowDropdown] = useState(false);

//   // Synchronize selectedOptions with Formik values or defaultValue
//   useEffect(() => {
//     if (props.values && props.values[props.name]) {
//       const selectedOptionValue = props.values[props.name];
//       const selectedOption = options.find(
//         (option: any) => option.value === selectedOptionValue
//       );
//       if (selectedOption) {
//         setSelectedOptions([selectedOption]);
//       }
//     } else if (props.defaultValue) {
//       // If no Formik value, fallback to defaultValue
//       setSelectedOptions(
//         props?.options?.filter((option: any) =>
//           props?.defaultValue?.includes(option.value)
//         ) || []
//       );
//     } else {
//       setSelectedOptions([]); // Clear selected options if no value is found
//     }
//   }, [props.values, props.name, options, props.defaultValue]);

//   const filteredOptions = useMemo(() => {
//     return options.filter((option: any) =>
//       option.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [searchTerm, options]);

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleOptionClick = (option: { name: string; value: any }) => {
//     if (props?.multiSelect) {
//       setSelectedOptions([...selectedOptions, option]);
//     } else {
//       setSelectedOptions([option]);
//     }
//     setSearchTerm("");
//     setShowDropdown(false);

//     if (props.onChange) {
//       props.onChange({
//         target: {
//           name: props.name,
//           value: props?.multiSelect
//             ? [...props?.values?.[props?.name], option?.value]
//             : option?.value,
//         },
//       });
//     }
//   };

//   const handleRemoveOption = (val?: any) => {
//     if (props?.multiSelect) {
//       if (val) {
//         setSelectedOptions(
//           selectedOptions.filter((option: any) => option.value !== val)
//         );
//         props?.remove(val);
//         return;
//       }
//       setSelectedOptions([]);

//       // Update Formik's state when the option is removed
//       if (props.onChange) {
//         if (val) {
//           props.onChange({
//             target: {
//               name: props.name,
//               value: props?.values?.[props?.name].filter(
//                 (value: any) => value !== val
//               ),
//             },
//           });
//           return;
//         }

//         props.onChange({
//           target: {
//             name: props.name,
//             value: [],
//           },
//         });
//       }
//     } else {
//       if (props.onChange) {
//         props.onChange({
//           target: {
//             name: props.name,
//             value: undefined, // Reset the value in Formik when removed
//           },
//         });
//       }
//       setSelectedOptions([]);
//       setSearchTerm("");
//     }
//   };

//   return (
//     <div
//       className={`flex flex-col max-w-full w-full gap-2 ${
//         props.className || ""
//       }`}
//     >
//       <label
//         htmlFor={props.name}
//         className={`text-[11px] font-bold text-black ${
//           props?.disabled ? "hidden" : ""
//         }`}
//       >
//         {props.label}
//       </label>

//       <div className="relative w-full grow">
//         {/* Search Input */}
//         <div
//           className={`relative flex no-scrollbar justify-stretch overflow-x-auto w-full h-full border border-gray-300 rounded focus:outline-none focus:ring-2 ${
//             isInvalid ? "border-red-500" : ""
//           }`}
//         >
//           {selectedOptions.length > 0 && !props?.multiSelect && (
//             <div
//               onClick={handleRemoveOption}
//               className="absolute right-2 cursor-pointer -translate-y-1/2 top-1/2"
//             >
//               x
//             </div>
//           )}
//           <div className="flex items-center p-1 gap-1 h-full">
//             {selectedOptions.length > 0 && (
//               <>
//                 {selectedOptions?.map((option: any) => (
//                   <div
//                     key={option?.value}
//                     className="flex w-fit h-full items-center gap-1 justify-between min-w-14 px-2 py-1 bg-primary text-white rounded"
//                   >
//                     <span className="text-nowrap">{option.name}</span>
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveOption(option.value)}
//                       className="text-xs font-bold cursor-pointer"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </>
//             )}
//           </div>
//           <input
//             type="text"
//             id={props.name}
//             name={props.name}
//             value={searchTerm}
//             onClick={() => setShowDropdown(!showDropdown)}
//             onChange={handleSearchChange}
//             onBlur={props.onBlur}
//             disabled={props.disabled}
//             placeholder={props.placeholder || "Search..."}
//             className={`p-2 outline-none w-full border-none focus:outline-none focus:ring-0 ${props?.disabled ? "pointer-events-none cursor-default" : ""}`}
//           />
//         </div>
//         {/* Dropdown */}
//         {showDropdown && filteredOptions.length > 0 && (
//           <ul className="absolute z-10 mt-1 max-h-40 w-full bg-white border border-gray-300 rounded shadow-lg overflow-y-auto no-scrollbar">
//             {filteredOptions.map((option: any) => (
//               <li
//                 key={option.value}
//                 onClick={() => {
//                   if (selectedOptions.some((o) => o.value === option.value)) {
//                     handleRemoveOption(option.value);
//                     return;
//                   }
//                   handleOptionClick(option);
//                 }}
//                 className="cursor-pointer flex p-2 hover:bg-indigo-600 hover:text-white relative"
//               >
//                 {option.name}
//                 {selectedOptions.some((o) => o.value === option.value) && (
//                   <div className="w-3 h-3 absolute right-2 -translate-y-1/2 top-1/2 cursor-pointer align-middle text-center">
//                     <TiTick />
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}

//         {showDropdown && filteredOptions.length === 0 && (
//           <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg p-2">
//             No options available!
//           </div>
//         )}
//       </div>

//       {isInvalid && (
//         <p className="text-red-500 font-[600] text-[10px]">
//           {props?.errors?.[props?.name]}
//         </p>
//       )}
//     </div>
//   );
// };

// export default SearchDropDown;

