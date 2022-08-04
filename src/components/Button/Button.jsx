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
  onClick: PropTypes.func.isRequired,
};

export default Button;
