import React from "react";
import { IconProps } from "types/components/icon";

const Warning = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={200}
      height={200}
      viewBox="0 0 512 512"
      {...props}
    >
      <circle
        cx={256}
        cy={447.174}
        r={54.627}
        style={{
          fill: "#fbb429",
        }}
      />
      <path
        d="M225.165 331.611h61.671c13.138 0 23.788-10.65 23.788-23.788V33.987c0-13.138-10.65-23.788-23.788-23.788h-61.671c-13.138 0-23.788 10.65-23.788 23.788v273.837c0 13.137 10.65 23.787 23.788 23.787z"
        style={{
          fill: "#fbb429",
        }}
      />
      <path
        d="M256 512c-35.743 0-64.822-29.079-64.822-64.822s29.079-64.822 64.822-64.822 64.822 29.079 64.822 64.822S291.743 512 256 512zm0-109.245c-24.495 0-44.424 19.928-44.424 44.424s19.928 44.423 44.424 44.423 44.424-19.928 44.424-44.424-19.929-44.423-44.424-44.423zM286.835 341.811h-61.672c-18.74 0-33.986-15.247-33.986-33.987V33.986C191.178 15.246 206.425 0 225.165 0h61.672c18.74 0 33.986 15.246 33.986 33.986v273.837c-.001 18.741-15.248 33.988-33.988 33.988zm-61.67-321.413c-7.492 0-13.587 6.096-13.587 13.587v273.837c0 7.493 6.096 13.588 13.587 13.588h61.672c7.492 0 13.587-6.096 13.587-13.588V33.986c0-7.492-6.096-13.587-13.587-13.587h-61.672z"
        style={{
          fill: "#4d4d4d",
        }}
      />
      <path
        d="M233.562 309.036c-5.632 0-10.199-4.567-10.199-10.199v-128.51c0-5.632 4.567-10.199 10.199-10.199s10.199 4.567 10.199 10.199v128.51c0 5.632-4.567 10.199-10.199 10.199zM233.562 149.928c-5.632 0-10.199-4.567-10.199-10.199v-8.159c0-5.632 4.567-10.199 10.199-10.199s10.199 4.567 10.199 10.199v8.159c0 5.632-4.567 10.199-10.199 10.199z"
        style={{
          fill: "#4d4d4d",
        }}
      />
    </svg>
  );
};
export default Warning;
