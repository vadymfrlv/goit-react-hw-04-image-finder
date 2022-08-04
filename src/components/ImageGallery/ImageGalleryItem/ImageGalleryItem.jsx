import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({ image, onClick, largeImageURL, tags }) {
  return (
    <li className={styles.gallery__item}>
      <img
        className={styles.gallery__img}
        src={image}
        alt={tags}
        data-source={largeImageURL}
        onClick={onClick}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
