import React from 'react';
import css from "./ImageCard.module.css";

interface Image {
  id: number;
  urls: {
    small: string;
  };
  alt_description: string;
}

interface Props {
  image: Image;
  handleClick: (id: number) => void;
}

const ImageCard: React.FC<Props> = ({ image, handleClick }) => {
  return (
    <div>
      <img
        onClick={() => {
          handleClick(image.id);
        }}
        className={css.ImageCard}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
