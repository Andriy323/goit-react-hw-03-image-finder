import { Component } from 'react';
import { Circles } from 'react-loader-spinner';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { getImg } from './shared/shared';
import css from './app.module.css';
export default class App extends Component {
  state = {
    img: [],
    query: '',
    showModal: false,
    imgModal: null,
    page: 1,
    loader: false,
  };
  componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.fetchImg();
    }
  }

  onSubmit = data => {
    this.setState({
      query: data,
      page: 1,
      img: [],
    });
  };
  totalHits = 0;
  perPage = 12;

  loadImg = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async fetchImg() {
    this.setState({ loader: true });

    try {
      const data = await getImg(
        this.state.query,
        this.perPage,
        this.state.page
      );
      this.totalHits = data.totalHits;
      this.setState({ img: [...this.state.img, ...data.hits] });
    } catch (error) {
    } finally {
      this.setState({ loader: false });
    }
  }

  showImgModal = imgLarge => {
    this.setState({
      showModal: true,
      imgModal: imgLarge,
    });
  };

  modalClose = () => {
    this.setState({
      showModal: false,
      imgModal: null,
    });
  };

  render() {
    const { img, showModal, imgModal, page, loader } = this.state;
    const { onSubmit, showImgModal, modalClose, loadImg, totalHits, perPage } =
      this;
    return (
      <>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery img={img} showImgModal={showImgModal} />
        {!loader && img.length !== 0 && page < totalHits / perPage && (
          <Button onClick={loadImg} />
        )}
        {showModal && <Modal urlImg={imgModal} close={modalClose} />}
        <Circles wrapperClass={css.loader} visible={loader} />
      </>
    );
  }
}
