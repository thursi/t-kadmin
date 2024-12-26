interface IDatePickerProps {
  onChange: any;
  name: string;
  label?: string;
  values?: any;
  errors?: any;
  touches?: any;
  onBlur?: any;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  hidden?: any;
  min?: any;
  max?: any;
  pattern?: any;
  color?: any;
}

const Index = (props: any) => {
  return (
    <div className="flex flex-col justify-start items-start gap-2">
      <label
        htmlFor={props.name}
        className={`text-[11px] font-bold  ${props?.color ? props?.color : 'text-black'} ${
          props?.hidden && "hidden"
        }`}
      >
        {props.label}
      </label>
      <input
        disabled={props.disabled}
        className={
          props?.className
            ? props?.className
            : "flex items-center appearance-none w-full px-2 h-6 py-4 border text-xs border-[#f9f8fc] rounded-md "
        }
        id={props?.name}
        placeholder={props.placeholder}
        name={props?.name}
        onChange={props?.onChange}
        autoFocus={props?.autoFocus}
        onBlur={props?.onBlur}
        type={"date"}
        value={props?.values[props?.name]}
        onKeyDown={props?.onKeyDown}
        defaultValue={props?.defaultValue}
        min={props?.min}
      />
      {props.errors?.[props.name] && props.touches?.[props.name] && (
        <span className="text-red-500 text-xs">{props.errors[props.name]}</span>
      )}
    </div>
  );
};

export default Index;
