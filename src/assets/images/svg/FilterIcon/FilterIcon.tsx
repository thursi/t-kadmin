import React from "react";
import { IconProps } from "types/components/icon";

const FilterIcon = (props: IconProps) => {
  return (
    <>
      <svg
        className={`${props.className}`}
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.5 12V19.88C14.54 20.18 14.44 20.5 14.21 20.71C14.1175 20.8027 14.0076 20.8762 13.8866 20.9264C13.7657 20.9766 13.636 21.0024 13.505 21.0024C13.374 21.0024 13.2444 20.9766 13.1234 20.9264C13.0024 20.8762 12.8925 20.8027 12.8 20.71L10.79 18.7C10.681 18.5933 10.5981 18.4629 10.5478 18.319C10.4975 18.175 10.4812 18.0213 10.5 17.87V12H10.47L4.71001 4.62C4.54762 4.41153 4.47434 4.14726 4.5062 3.88493C4.53805 3.6226 4.67244 3.38355 4.88001 3.22C5.07001 3.08 5.28001 3 5.50001 3H19.5C19.72 3 19.93 3.08 20.12 3.22C20.3276 3.38355 20.462 3.6226 20.4938 3.88493C20.5257 4.14726 20.4524 4.41153 20.29 4.62L14.53 12H14.5Z"
          fill="#8D9FBD"
        />
      </svg>
    </>
  );
};

export default FilterIcon;