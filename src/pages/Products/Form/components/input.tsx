import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";

export interface IInputProps {
  name: string;
  label?: string;
  type?: string;
  onChange?: any;
  value?: any;
  errors?: any;
  touches?: any;
  onBlur?: any;
  disabled?: boolean;
  autoFocus?: any;
  className?: any;
  placeholder?: any;
  onKeyDown?: any;
  defaultValue?: any;
  hidden?: any;
  min?: any;
  pattern?: any;
  required?: any;
  tooltip?: any;
}

export default function Input(props: IInputProps) {
  //   const isInvalid = React.useMemo(() => {
  //     return props?.touches[props?.name] && props?.errors[props?.name];
  //   }, [props?.touches, props?.errors, props?.name]);
  return (
    <div className="flex flex-col justify-start items-start gap-2 border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]">
      <label
        htmlFor={props.name}
        className={`text-[13px] font-bold text-black flex flex-row justify-between  ${
          props?.hidden && "hidden"
        }`}
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

      <input
        disabled={props.disabled}
        className={
          props?.className
            ? props?.className
            : "flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]"
        }
        id={props?.name}
        placeholder={props.placeholder}
        name={props?.name}
        onChange={props?.onChange}
        autoFocus={props?.autoFocus}
        onBlur={props?.onBlur}
        type={props?.type}
        value={props?.value}
        onKeyDown={props?.onKeyDown}
        defaultValue={props?.defaultValue}
        min={props?.min}
        pattern={props?.pattern}
      />

      {/* {isInvalid ? (
        <p className="text-red-500 font-[600] text-[10px]">
          {props?.errors[props?.name]}
        </p>
      ) : null} */}
    </div>
  );
}
