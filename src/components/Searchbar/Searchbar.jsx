import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = evt => {
    const { value } = evt.target;
    setSearch(value.trimStart());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (search.trim() === '') {
      return toast.info('Please enter your search query!');
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button className={styles.form__btn} type="submit">
          <span className={styles.form__btnLabel}>Search</span>
        </button>

        <input
          className={styles.from__input}
          type="text"
          value={search}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
