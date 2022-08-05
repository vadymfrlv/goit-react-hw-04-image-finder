import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ children }) => {
  return <ul className={styles.gallery__list}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.object,
};

export default ImageGallery;
