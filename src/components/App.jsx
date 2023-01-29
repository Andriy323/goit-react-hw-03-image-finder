import { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
// import style from '../components/style.css'
export default class App extends Component {
  state = {
    img: [],
    query: '',
    showModal: false,
    imgModal: null,
  };

  onSubmit = data => {
    this.setState({ query: data });
  };

  getImg() {
    const { REACT_APP_KEY } = process.env;
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

  showImg = ({ largeImageURL }) => {
    this.setState({
      showModal: true,
      imgModal: largeImageURL,
    });
  };

  modalClose = () => {
    this.setState({
      showModal: false,
      imgModal: null,
    });
  };

  render() {
    const { img, showModal, imgModal } = this.state;
    const { onSubmit, showImg, modalClose } = this;
    return (
      <>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery img={img} showImg={showImg} />
        {showModal && <Modal urlImg={imgModal} close={modalClose} />}
      </>
    );
  }
}
