import * as React from "react";
import { IconProps } from "types/components/icon";

const StatusIcon = (props: IconProps) => {
  return (
    <svg
      className={`${props.className}`}
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      viewBox="0 0 52 52"
      {...props} // Spread props to allow customization
    >
      <path d="M16.4 10h3.2a.77.77 0 0 0 .8-.7V6.8h11.2v2.4a.77.77 0 0 0 .7.8h3.3a.77.77 0 0 0 .8-.7V6.8A4.87 4.87 0 0 0 31.6 2H20.4a4.87 4.87 0 0 0-4.8 4.8v2.4a.79.79 0 0 0 .8.8M45.2 14.8H6.8A4.87 4.87 0 0 0 2 19.6v25.6A4.87 4.87 0 0 0 6.8 50h38.4a4.87 4.87 0 0 0 4.8-4.8V19.6a4.87 4.87 0 0 0-4.8-4.8M23.4 32.9l-6.1 6.3a1.08 1.08 0 0 1-1.1 0L10 32.9c-.5-.4-.1-1.1.7-1.1h3.8a12 12 0 0 1 11.8-12.2h.4v4.6a8.19 8.19 0 0 0-7.7 7.6h3.6c.8 0 1.2.7.8 1.1m19.4 0H39a12.16 12.16 0 0 1-12.1 12.2h-.3v-4.6c4.6 0 7.8-3 7.8-7.6h-3.7c-.8 0-1.1-.6-.7-1.1l6.2-6.3a1.08 1.08 0 0 1 1.1 0l6.2 6.3c.4.4 0 1.1-.7 1.1"></path>
    </svg>
  );
};
export default StatusIcon;
