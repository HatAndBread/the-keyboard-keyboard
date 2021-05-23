import React, { useState } from "react";

const Icon = ({
  src,
  alt,
  pointer,
  onClick,
  className,
}: {
  src: string;
  alt: string;
  pointer?: boolean;
  className?: string;
  onClick?: () => any;
}) => {
  const [error, setError] = useState(false);
  return error ? (
    <div
      className={className ? className : ""}
      onClick={onClick ? onClick : () => {}}>
      {alt}
    </div>
  ) : (
    <img
      className={className ? className : ""}
      onClick={onClick ? onClick : () => {}}
      src={src}
      alt={alt}
      style={pointer ? { cursor: "pointer" } : {}}
      onError={() => setError(true)}></img>
  );
};

export default Icon;
