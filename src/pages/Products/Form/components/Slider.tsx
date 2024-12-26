import { useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";

interface ISliderProps {
  label: string;
  name: string;
  onChange: any;
  value?: any;
  errors?: any;
  touches?: any;
  onBlur?: any;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  hidden?: any;
  required?: any;
  tooltip?: any;
}

const Slider = (props: ISliderProps) => {
  const [isOn, setIsOn] = useState(props?.value || false);

  const handleToggle = () => {
    setIsOn(!isOn);
    props?.onChange({ target: { name: props?.name, value: !isOn } });
  };
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
      <div className="flex items-center py-2">
        <div
          className={`relative w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
            isOn ? "bg-primary" : "bg-gray-300"
          }`}
          onClick={handleToggle}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              isOn ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
