import React, { useState } from 'react';

interface IDateTimePickerProps {
  onChange: (e: any) => void;
  name: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
}

const DateTimePicker = (props: IDateTimePickerProps) => {
  const [dateTime, setDateTime] = useState<string>(
    props.value || new Date().toISOString()
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    const isoDateTime = new Date(selectedValue).toISOString();
    setDateTime(isoDateTime);

    const syntheticEvent = {
      target: { name: props.name, value: isoDateTime },
    };
    props.onChange(syntheticEvent);
  };

  return (
    <div className="flex flex-col items-start gap-2">
      {props.label && (
        <label
          htmlFor={props.name}
          className="text-[13px] font-bold text-black"
        >
          {props.label}
        </label>
      )}

      <input
        type="datetime-local"
        id={props.name}
        name={props.name}
        value={dateTime.slice(0, 16)}
        onChange={handleChange}
        disabled={props.disabled}
        placeholder={props.placeholder}
        className="w-full px-2 py-2 border rounded-md text-xs border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-500"
      />
    </div>
  );
};

export default DateTimePicker;
