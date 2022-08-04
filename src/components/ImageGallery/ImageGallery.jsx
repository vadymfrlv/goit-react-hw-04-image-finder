import { memo } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem';
import styles from './ImageGallery.module.css';

function ImageGallery({ images, onOpenModal }) {
  const element = images.map(image => (
    <ImageGalleryItem
      onClick={() => onOpenModal(image)}
      key={image.id}
      image={image.webformatURL}
    />
  ));
  return <ul className={styles.gallery__list}>{element}</ul>;
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default memo(ImageGallery);
