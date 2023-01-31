import { Component } from 'react';
import { Circles } from 'react-loader-spinner';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import ImgDetails from './ImgDetails/ImgDetails';
import { getImg } from './shared/shared';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const { query, page } = this.state;

    try {
      const data = await getImg(query, this.perPage, page);

  
if(data.total && page ===1) {toast.success(`Found ${data.totalHits} images`)}
if(!data.total) toast.error('Nothing found. Repeat the search!');

      
      this.totalHits = data.totalHits;
      this.setState({ img: [...this.state.img, ...data.hits] });
    } catch (error) {
      toast.error('Oooops.... Repeat the search!');
    } finally {
      this.setState({ loader: false });
    }
  }

  showImgModal = imgLarge => {
    this.setState({
      showModal: true,
      imgModal: imgLarge,
    });
    document.body.style.overflow = "hidden"

  };

  modalClose = () => {
    this.setState({
      showModal: false,
      imgModal: null,
    });
    document.body.style.overflow = ""

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
        {showModal && (
          <Modal close={modalClose}>
            <ImgDetails urlImg={imgModal} />
          </Modal>
        )}
        <Circles wrapperClass={css.loader} visible={loader} />
        <ToastContainer />
      </>
    );
  }
}
