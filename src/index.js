import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { fetchImages } from './js/fetch';
import { createMarkup } from './js/render';
import scrollBy from './js/scroll';

const form = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const buttonOnLoad = document.querySelector('.load-more');
const lastMessage = document.querySelector('.last-message');

const options = {};
const simple = new SimpleLightbox('.gallery a', options);

let currentPage = 1;
let queryParam = null;

form.addEventListener('submit', onSearchForm);
buttonOnLoad.addEventListener('click', onLoadMore);
galleryEl.addEventListener('click', evt => {
  evt.preventDefault();
});

function onLoadMore() {
  // if (lightbox) {
  //   lightbox.refresh();
  // }
  currentPage += 1;
  renderImagesOnLoadMore(queryParam, currentPage);
}

function onSearchForm(evt) {
  evt.preventDefault();
  currentPage = 1;
  queryParam = evt.currentTarget.elements.searchQuery.value;
  galleryEl.innerHTML = '';
  buttonOnLoad.classList.add('is-hidden');
  if (!queryParam) {
    Notify.warning('Please, fill the field');
    return;
  }
  renderImagesBySubmit(queryParam);
  lastMessage.textContent = '';
}

// ++++++++++++++++++++++++++++++++++++++++++++

// without simpleLightbox

// async function renderImagesBySubmit() {
//   try {
//     const response = await fetchImages(queryParam);
//     const dataArray = response.data.hits;
//     galleryEl.innerHTML = createMarkup(dataArray);
//     if (!dataArray.length) throw new Error('not found');
//     if (dataArray.length)
//       Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
//     if (dataArray.length >= 40) {
//       buttonOnLoad.classList.remove('is-hidden');
//     } else {
//       lastMessage.textContent = `Hooray! We found ${response.data.totalHits} images.`;
//     }
//     scrollBy();
//   } catch (error) {
//     Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//     galleryEl.innerHTML = '';
//   }
// }

// async function renderImagesOnLoadMore() {
//   try {
//     const response = await fetchImages(queryParam, currentPage);
//     const dataArray = response.data.hits;
//     if (currentPage * 40 > response.data.totalHits) {
//       buttonOnLoad.classList.add('is-hidden');
//       lastMessage.textContent = `Hooray! We found ${response.data.totalHits} images.`;
//     }
//     galleryEl.insertAdjacentHTML('beforeend', createMarkup(dataArray));

//     scrollBy();
//   } catch (error) {
//     console.log(error);
//   }
// }

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++

// let lightbox = new SimpleLightbox('.gallery a');

async function renderImagesBySubmit() {
  try {
    const response = await fetchImages(queryParam);
    const dataArray = response.data.hits;
    galleryEl.innerHTML = createMarkup(dataArray);
    if (!dataArray.length) throw new Error('not found');
    if (dataArray.length)
      Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    if (dataArray.length >= 40) {
      buttonOnLoad.classList.remove('is-hidden');
    } else {
      lastMessage.textContent = `Hooray! We found ${response.data.totalHits} images.`;
    }

    simple.refresh();

    scrollBy();
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    galleryEl.innerHTML = '';
  }
}

async function renderImagesOnLoadMore() {
  try {
    const response = await fetchImages(queryParam, currentPage);
    const dataArray = response.data.hits;
    if (currentPage * 40 > response.data.totalHits) {
      buttonOnLoad.classList.add('is-hidden');
      lastMessage.textContent = `Hooray! We found ${response.data.totalHits} images.`;
    }
    galleryEl.insertAdjacentHTML('beforeend', createMarkup(dataArray));
    scrollBy();

    simple.refresh();
  } catch (error) {
    console.log(error);
  }
}
