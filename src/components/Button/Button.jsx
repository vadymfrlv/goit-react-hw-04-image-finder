import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onLoadMore, text }) => {
  return (
    <button className={styles.btn} onClick={onLoadMore} type="button">
      {text}
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
