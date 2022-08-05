import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ data, onOpenModal }) => {
  return data.map(el => (
    <li className={styles.gallery__item} key={el.id}>
      <img
        className={styles.gallery__img}
        src={el.webformatURL}
        alt={el.tag}
        onClick={() => onOpenModal(el.largeImageURL, el.tag)}
      />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGalleryItem;
