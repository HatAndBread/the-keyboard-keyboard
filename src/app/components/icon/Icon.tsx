import React, { useState } from 'react';
import ExplanationBox from './ExplanationBox';

const Icon = ({
  src,
  alt,
  pointer,
  onClick,
  className,
  messageBox,
}: {
  src: string;
  alt: string;
  pointer?: boolean;
  className?: string;
  onClick?: () => any;
  messageBox?: boolean;
}) => {
  const [error, setError] = useState(false);
  const [explanationOpacity, setExplanationOpacity] = useState(0);
  return error ? (
    <div
      className={className ? className : ''}
      onClick={onClick ? onClick : () => {}}>
      {alt}
    </div>
  ) : (
    <div>
      <img
        className={className ? className : ''}
        onClick={onClick ? onClick : () => {}}
        src={src}
        alt={alt}
        style={pointer ? { cursor: 'pointer' } : {}}
        onError={() => setError(true)}
        onMouseOver={() => setExplanationOpacity(1)}
        onMouseLeave={() => setExplanationOpacity(0)}></img>

      {messageBox && (
        <ExplanationBox message={alt} opacity={explanationOpacity} />
      )}
    </div>
  );
};

export default Icon;
