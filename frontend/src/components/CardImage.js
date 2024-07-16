// src/components/CardImage.js
import React, { useState } from 'react';

const CardImage = ({ src, alt }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc("path/to/default-image.jpg"); // Set a default image if loading fails
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      onError={handleError} 
      style={{ width: "100px", height: "auto" }}
    />
  );
};

export default CardImage;
