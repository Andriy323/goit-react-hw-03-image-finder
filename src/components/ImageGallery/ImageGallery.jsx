import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import style from '../ImageGallery/imageGallery.module.css';
class ImageGallery extends Component {
  showImg = img => {
    this.props.showImgModal(img);
  };

  render() {
    const { img } = this.props;
    return (
      <ul className={style.imageGallery}>
        {img.map(({ webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={largeImageURL}
            src={webformatURL}
            alt={tags}
            showImg={this.showImg}
            largeImg={largeImageURL}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  showImgModal: PropTypes.func.isRequired
}

export default ImageGallery;
