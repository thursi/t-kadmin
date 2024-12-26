import { FaChevronDown } from "react-icons/fa"; // You can use any icon library, like react-icons

interface IDropDownProps {
  name: string;
  label?: string;
  onChange: (selectedOptions: any) => void;
  values?: any;
  errors?: any;
  touches?: any;
  onBlur?: any;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  options?: { name: string; value: any }[];
}

function DropDown(props: IDropDownProps) {
  return (
    <div className={`flex flex-col w-full gap-1.5 ${props.className || ""}`}>
      {/* Label */}
      {props.label && !props.disabled && (
        <label
          htmlFor={props.name}
          className="text-[11px] font-bold text-black"
        >
          {props.label}
        </label>
      )}

      <div className="relative w-full">
        {/* Select Dropdown */}
        <select
          id={props.name}
          className="w-full px-4 py-2 border  text-black text-sm border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3] appearance-none"
          name={props.name}
          value={props.values?.[props.name] || undefined} // Use the value directly
          onChange={(e) => {
            props.onChange({
              target: {
                name: props.name,
                value: e.target.value,
              },
            });
          }}
          disabled={props.disabled}
        >
          {/* Placeholder Option (optional) */}
          {props.placeholder && (
            <option value="" selected>
              {props.placeholder}
            </option>
          )}

          {/* Render Options */}
          {props.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow Icon */}
        {/* <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
          <FaChevronDown className="text-gray-500" />
        </div> */}
      </div>

      {/* Optionally display errors and touches */}
      {props.errors?.[props.name] && props.touches?.[props.name] && (
        <span className="text-red-500 text-xs">{props.errors[props.name]}</span>
      )}
    </div>
  );
}

export default DropDown;
