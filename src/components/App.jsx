import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { getImg } from './shared/shared';
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

  newState(data) {
    console.log(data.hits);
    this.setState({ img: [...data.hits] });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImg();
      console.log('didUpdate');
    }
  }
  async fetchImg() {
    try {
      console.log('sadasdasd');
      const data = await getImg(this.state.query);
      this.newState(data);
      console.log(data);
    } catch (error) {
    } finally {
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
    const { img, showModal, imgModal } = this.state;
    const { onSubmit, showImgModal, modalClose } = this;
    return (
      <>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery img={img} showImgModal={showImgModal} />
        <Button />

        {showModal && <Modal urlImg={imgModal} close={modalClose} />}
      </>
    );
  }
}
