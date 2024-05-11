import React from 'react';
import css from "./ImageCard.module.css";
import { Image } from '../API/API';

interface Props {
  image: Image;
  handleClick: (id: string) => void;
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
