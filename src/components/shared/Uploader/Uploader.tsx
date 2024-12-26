import React, { useMemo, useState } from "react";
import defaultImage from "assets/images/png/ion_image.png";

export interface IUploadProps {
  name: string;
  label?: string;
  onChange?: (file: File | null) => void; // Adjusted the type to reflect that it accepts a file
  values?: any;
  errors?: any;
  touches?: any;
  onBlur?: any;
  disabled?: boolean;
  autoFocus?: any;
  className?: any;
  placeholder?: any;
  alt?: any;
}

export default function Upload(props: IUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const isInvalid = useMemo(() => {
    return props?.touches[props?.name] && props?.errors[props?.name];
  }, [props?.touches, props?.errors, props?.name]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      // Create a URL for the selected file and set it for preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Call the onChange prop if provided
      if (props.onChange) {
        props.onChange(file);
      }
    } else {
      // Reset preview if no file is selected
      setImagePreview(null);
      if (props.onChange) {
        props.onChange(null);
      }
    }
  };

  return (
    <div className="flex flex-col justify-start items-start gap-2 relative">
      <label htmlFor={props.name} className="text-[11px] font-bold text-black">
        {props.label}
      </label>
      <div className="h-40 w-full rounded-xl overflow-hidden border border-[#b0afb3] relative flex flex-col justify-center items-center gap-1">
        {imagePreview && (
          <img
            src={imagePreview}
            alt={props?.alt ?? "preview"}
            className="mt-2  object-contain max-h-[108px] h-[108px] w-[108px] rounded-lg"
          />
        )}
        {!imagePreview && (
          <div className="h-16 w-16 rounded-full object-center bg-[#E1E5E9] flex justify-center items-center">
            <img
              src={defaultImage}
              alt={"default_image"}
              className="w-6 h-6 object-cover object-center"
            />
          </div>
        )}
        <div className="self-center w-full flex justify-center">
          <div className=" w-1/2">
            <input
              disabled={props.disabled}
              className="w-full text-primary flex justify-center text-sm file:cursor-pointer cursor-pointer file:border-0 file:rounded-lg file:py-2 file:px-4 file:mr-4 rounded"
              id={props.name}
              placeholder={props.placeholder}
              name={props.name}
              onChange={handleChange}
              autoFocus={props.autoFocus}
              onBlur={props.onBlur}
              type="file"
              accept="image/*"
            />
          </div>
        </div>
      </div>

      {isInvalid && (
        <p className="text-red-500 font-[600] text-[12px]">
          {props.errors[props.name]}
        </p>
      )}
    </div>
  );
}
