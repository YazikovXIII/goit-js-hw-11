import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function createMarkup(array) {
  return array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <div class="photo-card">
        <a href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width=400 height=auto>
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes:</b>${likes}
    </p>
    <p class="info-item">
      <b>Views:</b>${views}
    </p>
    <p class="info-item">
      <b>Comments:</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b>${downloads}
    </p>
  </div>
</div>`;
      }
    )
    .join('');
}

export function openModal() {
  const someGallery = new SimpleLightbox('.gallery a');
  someGallery.on('show.simplelightbox', function () {
    const { defaultOptions } = lightbox;
    defaultOptions.captionDelay = 250;
  });
}

export function refreshModal() {
  const someGallery = new SimpleLightbox('.gallery a');
  someGallery.refresh();
}
