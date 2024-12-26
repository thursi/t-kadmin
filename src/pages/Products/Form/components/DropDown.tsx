import { FaChevronDown } from 'react-icons/fa'; // You can use any icon library, like react-icons
import { RiErrorWarningFill } from 'react-icons/ri';

interface IDropDownProps {
  name: string;
  label?: string;
  onChange: (selectedOptions: any) => void;
  value?: any;
  errors?: any;
  touches?: any;
  onBlur?: any;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  tooltip?: string;
  required?: boolean;
  options?: { name: string; value: any }[];
}

function DropDown(props: IDropDownProps) {
  return (
    <div className={`flex flex-col w-full gap-1.5 ${props.className || ''}`}>
      {/* Label */}
      {props.label && !props.disabled && (
        <label
          htmlFor={props.name}
          className="text-[13px] font-bold text-black"
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
      )}

      <div className="relative w-full">
        {/* Select Dropdown */}
        <select
          id={props.name}
          className="w-full px-4 py-2 border text-black text-sm border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]
 appearance-none"
          name={props.name}
          value={props.value || undefined} // Use the value directly
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
            <option value="" disabled>
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
