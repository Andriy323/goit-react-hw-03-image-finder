import style from './image-gallery-item.module.css';

function ImageGalleryItem(props) {
  const {  src, alt, test, showImg } = props;
  return (
 
    <li
            onClick={() => showImg(test)}
      className={style.imageGalleryItem}
    >
       <img src={src} alt={alt} className={style.imageGalleryItemImage} />
    
    </li>
  );
}

export default ImageGalleryItem;

// {img.map(({ id, webformatURL, largeImageURL, tags }) => (
//     <li key={id} onClick={() => showImg({largeImageURL})} className={style.imageGalleryItem} >
//       <img src={webformatURL} alt={tags} className={style.imageGalleryItemImage}/>
//     </li>
//   ))}
