import { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
// import style from '../components/style.css'
export default class App extends Component {
  state = {
    img: [],
    query: '',
  };

  onSubmit = data => {
    this.setState({ query: data });
  };


  

  getImg() {
    const {REACT_APP_KEY} = process.env;
    axios
      .get('https://pixabay.com/api/', {
        params: {
          key: REACT_APP_KEY,
          q: this.state.query,
          per_page: 12,
          page: 1,
        },
      })
      .then(({ data }) => {
        this.newState(data);
      });
    // .catch(function (error) {
    //   console.log(error);
    // })
    // .then(function () {
    //   // выполняется всегда
    // });
  }

  newState(data) {
    console.log(data.hits);
    this.setState({ img: [...data.hits] });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.getImg();
      console.log('didUpdate');
    }
  }

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery img={this.state.img} />
      </>
    );
  }
}
