import { useState, useEffect, useRef, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import apiService from '../services/pixabayAPI';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import ImageGalleryItem from './ImageGallery/ImageGalleryItem';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import styles from './App.module.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('static'); /* static, loading, error, modal */
  const [modal, setModal] = useState({});
  const [error, setError] = useState(null);

  const firstPageRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiService(search, page);
        setImages(prev => [...prev, ...data.hits]);
        setStatus('static');
        setError('null');
      } catch (error) {
        setStatus('error');
        setError(error);
      }
    };

    if (search) {
      setStatus('loading');
      firstPageRef.current = document.body.clientHeight;
      fetchPosts();
    }
  }, [search, page]);

  useEffect(() => {
    if (page > 1) {
      window.scrollTo({
        top: firstPageRef.current,
        behavior: 'smooth',
      });
    }
  }, [images, page]);

  const handleFormSubmit = newSearch => {
    if (newSearch === search) {
      return;
    }
    setSearch(newSearch);
    setPage(1);
    setImages([]);
    firstPageRef.current = null;
  };

  const onLoadMore = useCallback(() => setPage(prevState => prevState + 1), []);

  const onOpenModal = (src, alt) => {
    setStatus('modal');
    setModal({ src, alt });
  };

  const toggleModal = () => {
    setStatus('static');
  };

  return (
    <div className={styles.container}>
      <Searchbar onSubmit={handleFormSubmit} />

      {status === 'error' && <p className={styles.inform}>Search error</p>}
      {!images.length && search && error && (
        <p className={styles.inform}>No results found for "{search}" !</p>
      )}

      {images.length > 0 && (
        <ImageGallery>
          <ImageGalleryItem onOpenModal={onOpenModal} data={images} />
        </ImageGallery>
      )}

      {status === 'loading' && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}

      {images.length >= 12 && error && <Button onLoadMore={onLoadMore} text="Load more" />}

      {status === 'modal' && <Modal modal={modal} toggleModal={toggleModal} />}

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default App;
