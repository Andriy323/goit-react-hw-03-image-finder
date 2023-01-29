import style from '../ImageGallery/imageGallery.module.css';

export default function ImageGallery({img, showImg}) {
  return (
    <ul className={style.imageGallery}>
      {img.map(({ id, webformatURL, largeImageURL, tags }) => (
        <li key={id} onClick={() => showImg({largeImageURL, tags})} className={style.imageGalleryItem} >
          <img src={webformatURL} alt={tags} className={style.imageGalleryItemImage}/>
        </li>
      ))}
    </ul>
  );
}
