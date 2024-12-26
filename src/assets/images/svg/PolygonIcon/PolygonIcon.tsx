import React from "react";
import { IconProps } from "types/components/icon";

const PolygonIcon = (props: IconProps) => {
  return (
    <>
      <svg
        className={`${props.className}`}
        viewBox="0 0 10 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 8L9.33013 0.5H0.669873L5 8Z" fill="#718096" />
      </svg>
    </>
  );
};

export default PolygonIcon;
