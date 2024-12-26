import React from "react";
import { IconProps } from "types/components/icon";

const ArrowIcon = (props: IconProps) => {
  return (
    <>
      <svg
        className={`${props.className}`}
      
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.75269 13L1.89942 7L7.75269 1"
          stroke="#007BFF"
          stroke-width="2"
        />
      </svg>
    </>
  );
};

export default ArrowIcon;
