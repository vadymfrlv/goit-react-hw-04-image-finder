import React, { Component } from 'react';
import API from '../services/pixabayAPI';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import styles from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    loading: false,
    modalImage: null,
    error: null,
  };

  handleFormSubmit = query => {
    this.setState({
      searchQuery: query,
      images: [],
      page: 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    prevQuery !== nextQuery && this.fetchImages();

    if (this.state.page > 2) {
      this.handleScroll();
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({
      loading: true,
    });

    API.fetchImagesWithQuery(searchQuery, page)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  handleScroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  openModal = imageUrl => {
    this.setState({ modalImage: imageUrl });
  };

  closeModal = () => {
    this.setState({ modalImage: null });
  };

  render() {
    const { images, loading, modalImage } = this.state;
    return (
      <div className={styles.container}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onClick={this.openModal} />
        {modalImage && <Modal largeImage={modalImage} onClose={this.closeModal} />}
        {loading && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
        {images.length > 0 && !loading && <Button onClick={this.fetchImages} />}
      </div>
    );
  }
}
