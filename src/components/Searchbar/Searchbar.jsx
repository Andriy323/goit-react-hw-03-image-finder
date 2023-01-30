import { Component } from 'react';
import style from '../Searchbar/searchbar.module.css';
import PropTypes from 'prop-types';
export default class Searchbar extends Component {
  state = {
    query: '',
  };

  hangleInput = el => {
    const data = el.target.value;
    this.setState({ query: data });
  };

  onSubmit = el => {
    el.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state.query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={style.searchbar}>
        <form onSubmit={this.onSubmit} className={style.searchForm}>
          <button type="submit" className={style.searchFormButton}>
            <span className={style.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={style.searchFormInput}
            type="text"
            value={this.state.query}
            placeholder="Search images and photos"
            onChange={this.hangleInput}
            required
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
