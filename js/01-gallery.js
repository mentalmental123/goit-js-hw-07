import { galleryItems } from './gallery-items.js';
// Change code below this line


const markup = galleryItems.map(item => `<li class="gallery__item">
  <a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</li>`).join('');

const refs = {
    list: document.querySelector('.gallery'),
    link: document.querySelector('.gallery__link')
}
refs.list.insertAdjacentHTML('afterbegin', markup);

refs.list.addEventListener('click', getLargerImage);
function getLargerImage(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== 'IMG') {
        return;
    }
    const largerImgLink = evt.target.dataset.source;

    const instance = basicLightbox.create(`
    <img src="${largerImgLink}" width="800" height="600">
    `,{
	onShow: (instance) => {document.addEventListener('keydown', getEscp)},
	/*
	 * Function that gets executed before the lightbox closes.
	 * Returning false will prevent the lightbox from closing.
	 */
	onClose: (instance) => {document.removeEventListener('keydown', getEscp)}
})

    instance.show()
    
    function getEscp(evt) {
        if (evt.code !== 'Escape') {
            return;
        }
        instance.close();
        document.removeEventListener('keydown', getEscp)
    }
    
    

}
