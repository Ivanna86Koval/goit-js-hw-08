// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';
// Change code below this line
/*console.log(galleryItems);*/
const galleryRef = document.querySelector('.gallery');

function createGallery(galleryItems) {
  const galleryMarkup = galleryItems.map(createElementMarkup).join('');

  galleryRef.insertAdjacentHTML('afterbegin', galleryMarkup);
}

function createElementMarkup({ description, original, preview }) {
  return `
    <li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>
</li>`;
}

createGallery(galleryItems);

galleryRef.addEventListener('click', onClickImg);

function onClickImg(e) {
  if (e.target === e.currentTarget) {
    return;
  }

  e.preventDefault();
}

new SimpleLightbox(`.gallery a`, {
  captionsData: 'alt',
  captionDelay: 250,
});
