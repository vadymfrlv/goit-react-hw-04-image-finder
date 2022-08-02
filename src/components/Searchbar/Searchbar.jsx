import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = evt => {
    const value = evt.currentTarget.value.trimStart();
    this.setState({ inputValue: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;

    return (
      <header className={styles.header}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button className={styles.form__btn} type="submit">
            <span className={styles.form__btnLabel}>Search</span>
          </button>

          <input
            className={styles.from__input}
            type="text"
            value={inputValue}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
