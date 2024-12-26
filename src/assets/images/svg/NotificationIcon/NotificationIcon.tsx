import React from "react";
import { IconProps } from "types/components/icon";

const NotificationIcon = (props: IconProps) => {
  return (
    <>
      <svg
        className={`${props.className}`}
        viewBox="0 0 24 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.3244 20.5362C22.5744 19.8676 21.9178 19.1011 21.3722 18.2574C20.776 17.0929 20.419 15.8209 20.3222 14.5162V10.674C20.3274 8.62505 19.5841 6.64472 18.2321 5.10511C16.8801 3.5655 15.0125 2.57258 12.98 2.31291V1.30957C12.98 1.03419 12.8706 0.770086 12.6759 0.575361C12.4812 0.380636 12.217 0.27124 11.9417 0.27124C11.6663 0.27124 11.4022 0.380636 11.2075 0.575361C11.0127 0.770086 10.9033 1.03419 10.9033 1.30957V2.32846C8.88909 2.60685 7.04398 3.60577 5.70974 5.14021C4.37551 6.67465 3.64257 8.64063 3.64667 10.674V14.5162C3.54987 15.8209 3.19286 17.0929 2.59667 18.2574C2.06069 19.0992 1.41459 19.8656 0.675554 20.5362C0.59259 20.6091 0.526098 20.6988 0.480501 20.7994C0.434905 20.9 0.41125 21.0091 0.41111 21.1196V22.1774C0.41111 22.3836 0.493054 22.5815 0.638916 22.7273C0.784777 22.8732 0.982608 22.9551 1.18889 22.9551H22.8111C23.0174 22.9551 23.2152 22.8732 23.3611 22.7273C23.5069 22.5815 23.5889 22.3836 23.5889 22.1774V21.1196C23.5887 21.0091 23.5651 20.9 23.5195 20.7994C23.4739 20.6988 23.4074 20.6091 23.3244 20.5362ZM2.02889 21.3996C2.75237 20.7004 3.3895 19.917 3.92667 19.0662C4.67783 17.66 5.11564 16.1078 5.21 14.5162V10.674C5.17915 9.76249 5.33205 8.85408 5.65959 8.00287C5.98713 7.15166 6.48261 6.37507 7.11652 5.71934C7.75044 5.06361 8.50983 4.54215 9.34947 4.18601C10.1891 3.82987 11.0918 3.64633 12.0039 3.64633C12.9159 3.64633 13.8187 3.82987 14.6583 4.18601C15.4979 4.54215 16.2573 5.06361 16.8913 5.71934C17.5252 6.37507 18.0206 7.15166 18.3482 8.00287C18.6757 8.85408 18.8286 9.76249 18.7978 10.674V14.5162C18.8921 16.1078 19.3299 17.66 20.0811 19.0662C20.6183 19.917 21.2554 20.7004 21.9789 21.3996H2.02889Z"
          fill="black"
        />
      </svg>
    </>
  );
};

export default NotificationIcon;
