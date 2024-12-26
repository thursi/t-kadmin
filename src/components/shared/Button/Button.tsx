import * as React from 'react';

export interface IButtonProps {
  name: any;
  onClick?: any;
  type?: any;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export default function Button(props: IButtonProps) {
  return (
    <div className="flex justify-center items-center">
      <button
        className={
          props.className
            ? props.className
            : `text-[12px] font-bold text-white bg-gray-800 text-center p-2 w-[100px] rounded-md cursor-pointer`
        }
        onClick={props.onClick}
        type={props.type || 'button'}
        disabled={props.disabled}
      >
        {props.name}
      </button>
    </div>
  );
}
