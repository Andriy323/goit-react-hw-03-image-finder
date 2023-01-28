import style from '../ImageGallery/imageGallery.module.css';

export default function ImageGallery( {img} ) {
  return (
    <ul className={style.imageGallery}>
      {img.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li key={id} className={style.imageGalleryItem} >
          <img src={webformatURL} alt={tags} className={style.imageGalleryItemImage}/>
        </li>
      ))}
    </ul>
  );
}
