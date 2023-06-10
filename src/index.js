import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {
  renderInvalidValue,
  renderInfo,
  renderErr,
} from './helpers-js/notifix';

import { renderCard } from './helpers-js/renderCard';
import {
  API_KEY,
  BASE_URL,
  gallery,
  form,
  target,
} from './helpers-js/variables';

form.addEventListener('submit', onMakeSubmit);
gallery.addEventListener('click', openModalImg);



let options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);

let currentPage = 1;
function onLoad(entries, a) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const inputValue = document.getElementById('searchQuery').value;
      currentPage += 1;
      requestOnBack(inputValue, currentPage);
    }
  });
}

function openModalImg(even) {
  even.preventDefault();
}

function onMakeSubmit(e) {
  e.preventDefault();
  const inputValue = e.currentTarget.searchQuery.value;
  if (inputValue.trim() == '') {
    renderInvalidValue();
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
      renderErr();
    } else {
      gallery.insertAdjacentHTML('beforeend', renderCard(arrCard));
      var lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: 250,
        captionSelector: 'img',
        captionsData: 'alt',
      });
      observer.observe(target);
      if (resp.data.totalHits === gallery.children.length) {
        renderInfo();
      }
    }
  } catch (e) {
    renderErr();
  }
}