import { useState, useEffect, useRef, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import { apiService } from '../services/pixabayAPI';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import styles from './App.module.css';

const App = () => {
  const [data, setData] = useState({
    images: [],
    loading: false,
    error: null,
  });
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState({
    open: false,
    content: null,
  });

  const firstPageRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiService(page, search);
        setData(prevState => {
          return {
            images: [...prevState.images, ...data.hits],
            loading: false,
            error: null,
          };
        });
      } catch (error) {
        setData(prevState => ({
          ...prevState,
          loading: false,
          error: error.message,
        }));
      }
    };

    if (search) {
      fetchPosts();
      firstPageRef.current = document.body.clientHeight;
      setData(prevState => ({
        ...prevState,
        loading: true,
      }));
    }
  }, [search, page]);

  useEffect(() => {
    console.log(firstPageRef.current);
    if (page > 1) {
      window.scrollTo({
        top: firstPageRef.current,
        behavior: 'smooth',
      });
    }
  }, [data.images, page]);

  const handleFormSubmit = newSearch => {
    if (newSearch === search) {
      return;
    }
    setSearch(newSearch);
    setPage(1);
    setData(prevState => ({
      ...prevState,
      images: [],
    }));
  };

  const onLoadMore = useCallback(() => setPage(prevState => prevState + 1), []);

  const showModal = useCallback(content => {
    setModal({
      open: true,
      content,
    });
  }, []);

  const closeModal = () => {
    setModal({
      open: false,
      content: null,
    });
  };

  return (
    <div className={styles.container}>
      <Searchbar onSubmit={handleFormSubmit} />
      {data.error && <p className={styles.inform}>Search error</p>}
      {!data.images.length && search && !data.loading && !data.error && (
        <p className={styles.inform}>No results found for "{search}" !</p>
      )}
      {modal.open && (
        <Modal handleClose={closeModal}>
          <div className={styles.imageBox}>
            <img src={modal.content.largeImageURL} alt={modal.content.alt} />
          </div>
        </Modal>
      )}
      {Boolean(data.images.length) && <ImageGallery onOpenModal={showModal} images={data.images} />}
      {data.loading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
      {!data.loading && data.images.length >= 12 && !data.error && (
        <Button onLoadMore={onLoadMore} text="Load more" />
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default App;
