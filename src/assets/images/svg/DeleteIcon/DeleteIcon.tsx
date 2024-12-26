import React from "react";
import { IconProps } from "types/components/icon";

const EyeIcon = (props: IconProps) => {
  return (
    <>
      <svg
        className={`${props.className}`}
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.90913 14C4.53936 14 4.22293 13.8696 3.95983 13.6087C3.69674 13.3478 3.56497 13.0338 3.56452 12.6667V4H2.89221V2.66667H6.25374V2H10.2876V2.66667H13.6491V4H12.9768V12.6667C12.9768 13.0333 12.8453 13.3473 12.5822 13.6087C12.3191 13.87 12.0024 14.0004 11.6322 14H4.90913ZM11.6322 4H4.90913V12.6667H11.6322V4ZM6.25374 11.3333H7.59835V5.33333H6.25374V11.3333ZM8.94296 11.3333H10.2876V5.33333H8.94296V11.3333Z"
          fill="#718096"
        />
      </svg>
    </>
  );
};

export default EyeIcon;
