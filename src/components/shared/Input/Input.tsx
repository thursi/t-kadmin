import React, { useMemo } from 'react';

export interface IInputProps {
  name: string;
  label?: string;
  type?: string;
  onChange?: any;
  values?: any;
  errors?: any;
  touches?: any;
  onBlur?: any;
  disabled?: boolean;
  autoFocus?: any;
  className?: any;
  placeholder?: any;
  onKeyDown?: any;
  defaultValue?: any;
  hidden?:any
  min?:any
  pattern?:any
  color?:any;
}


export default function Input(props: IInputProps) {
  const isInvalid = useMemo(() => {
    return props?.touches[props?.name] && props?.errors[props?.name];
  }, [props?.touches, props?.errors, props?.name]);

  return (
    <div className="flex flex-col justify-start items-start gap-2">
      <label
        htmlFor={props.name}
        className={`text-[11px] font-bold  ${props?.color ? props?.color : 'text-black'} ${props?.hidden && 'hidden'}`}
      >
        {props.label}
      </label>

      <input
        disabled={props.disabled}
        className={
          props?.className
            ? props?.className
            : 'flex items-center w-full px-2 h-6 py-4 border text-xs border-[#b0afb3] rounded-md focus:outline-none focus:ring-0 focus:border-[#b0afb3]'
        }
        id={props?.name}
        placeholder={props.placeholder}
        name={props?.name}
        onChange={props?.onChange}
        autoFocus={props?.autoFocus}
        onBlur={props?.onBlur}
        type={props?.type}
        value={props?.values[props?.name]}
        onKeyDown={props?.onKeyDown}
        defaultValue={props?.defaultValue}
        min={props?.min}
        pattern={props?.pattern}
      />

      {isInvalid ? (
        <p className="text-red-500 font-[600] text-[10px]">
          {props?.errors[props?.name]}
        </p>
      ) : null}
    </div>
  );
}
