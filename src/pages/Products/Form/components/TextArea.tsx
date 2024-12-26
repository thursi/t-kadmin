import React, { useMemo } from "react";
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
  tooltip?: any;
  required?: any;
}

export default function TextArea(props: IInputProps) {
  // const isInvalid = useMemo(() => {
  //   return props?.touches[props?.name] && props?.errors[props?.name];
  // }, [props?.touches, props?.errors, props?.name]);

  return (
    <div className="flex flex-col justify-start items-start gap-2">
      <label
        htmlFor={props.name}
        className={`text-[13px] font-bold text-black ${
          props?.hidden && "hidden"
        }`}
      >
        {props.label}{" "}
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

      <textarea
        disabled={props.disabled}
        className={
          props?.className
            ? props?.className
            : "flex items-center w-full px-2 h-40 py-4 border text-xs border-[#f9f8fc] rounded-md "
        }
        id={props?.name}
        placeholder={props.placeholder}
        name={props?.name}
        onChange={props?.onChange}
        autoFocus={props?.autoFocus}
        onBlur={props?.onBlur}
        value={props?.value}
        onKeyDown={props?.onKeyDown}
        defaultValue={props?.defaultValue}
      />

      {/* {isInvalid ? (
        <p className="text-red-500 font-[600] text-[10px]">
          {props?.errors[props?.name]}
        </p>
      ) : null} */}
    </div>
  );
}
