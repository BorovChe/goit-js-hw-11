import Notiflix from 'notiflix';
import axios from 'axios';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";

import { renderCard } from './helpers-js/renderCard';
import { API_KEY, BASE_URL, gallery, form, pageBtn } from './helpers-js/variables';




pageBtn.addEventListener('click', onload);
form.addEventListener('submit', onMakeSubmit);

let currentPage = 1;
function onload() {
  const inputValue = document.getElementById('searchQuery').value;
  currentPage += 1;
  requestOnBack(inputValue, currentPage);
}

function onMakeSubmit(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  const inputValue = e.currentTarget.searchQuery.value;
  requestOnBack(inputValue, (currentPage = 1));
}

async function requestOnBack(value, page = 1) {
  try {
    const resp = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );
    const arrCard = resp.data.hits;
    if (arrCard.length === 0) {
      pageBtn.hidden = true;
      renderErr();
    }
    else {
      gallery.insertAdjacentHTML('beforeend', renderCard(arrCard));
      pageBtn.removeAttribute('hidden');
      if (resp.data.totalHits === gallery.children.length) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        pageBtn.hidden = true;
      }
    }
  } catch (e) {
    renderErr();
  }
}

function renderErr() {
  Notiflix.Notify.failure(
    '"Sorry, there are no images matching your search query. Please try again."'
  );
}



// var lightbox = new SimpleLightbox(".gallery a", {
//   captionDelay: 250,
//   captionSelector: "img",
//   captionsData: "alt",
// });