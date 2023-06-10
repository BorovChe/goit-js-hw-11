import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { renderCard } from './helpers-js/renderCard';
import {
  API_KEY,
  BASE_URL,
  gallery,
  form,
  pageBtn,
} from './helpers-js/variables';


gallery.addEventListener("click", openModalImg);

function openModalImg(even) {
  even.preventDefault();
};

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
  const inputValue = e.currentTarget.searchQuery.value;
  if (inputValue.trim() == '') {
    Notiflix.Notify.failure('Invalid value entered!!!');
  } else {
    gallery.innerHTML = '';
    requestOnBack(inputValue, (currentPage = 1));
  }
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
    } else {
      gallery.insertAdjacentHTML('beforeend', renderCard(arrCard));
                var lightbox = new SimpleLightbox(".gallery a", {
  captionDelay: 250,
  captionSelector: "img",
  captionsData: "alt",
});
      pageBtn.removeAttribute('hidden');
      if (resp.data.totalHits === gallery.children.length) {
        renderInfo();
        pageBtn.hidden = true;
      }
    }
  } catch (e) {
    renderErr();
  }
}

function renderInfo() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

function renderErr() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

