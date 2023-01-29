import { Component } from 'react';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import style from '../ImageGallery/imageGallery.module.css';
class ImageGallery extends Component {
  showImg = img => {
    this.props.showImgModal(img);
  };

  render() {
    const { img } = this.props;
    return (
      <ul className={style.imageGallery}>
        {img.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            src={webformatURL}
            alt={tags}
            showImg={this.showImg}
            test={largeImageURL}
          />
        ))}
      </ul>
    );
  }
}
export default ImageGallery;
