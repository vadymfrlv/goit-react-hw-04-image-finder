import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ handleClose, children }) => {
  useEffect(() => {
    const close = e => {
      if (e.code === 'Escape') {
        return handleClose();
      }
    };
    document.addEventListener('keydown', close);

    return () => document.removeEventListener('keydown', close);
  }, [handleClose]);

  const close = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return createPortal(
    <div onClick={close} className={styles.backdrop}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default memo(Modal);
