import React from "react";
import DefaultImage from "assets/images/png/default_user.png";

interface IImageProps {
  src: string | undefined;
  className?: string;
  alt: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void; // Optional onClick prop
}

const Image = ({ src, className, alt, onClick }: IImageProps) => {
  return (
    <img
      className={className}
      src={src ?? DefaultImage}
      alt={alt}
      onClick={onClick} // Attach the event handler
    />
  );
};

export default Image;
