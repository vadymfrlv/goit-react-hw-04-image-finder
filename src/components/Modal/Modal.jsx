import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ toggleModal, modal }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleModal]);

  const handleCloseBackdrop = evt => {
    if (evt.target.nodeName !== 'DIV') return;
    toggleModal();
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleCloseBackdrop}>
      <div className={styles.modal}>
        <img src={modal.src} alt={modal.alt} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
};

export default memo(Modal);
