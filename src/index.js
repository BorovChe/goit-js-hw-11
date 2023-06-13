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

var lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionSelector: 'img',
  captionsData: 'alt',
});

form.addEventListener('submit', onMakeSubmit);

let options = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);
let currentPage = 1;

function onLoadArr(entries) {
  return entries
    .map(entry => {
      return entry.isIntersecting;
    })
    .join('');
}

function onLoad(entries, observ) {
  if (onLoadArr(entries)) {
    console.log(onLoadArr(entries));
    const inputValue = document.getElementById('searchQuery').value;
    currentPage += 1;
    requestOnBack(inputValue, currentPage).then(resp => {
      const arrCard = resp.data.hits;
      const totalHits = resp.data.totalHits;
      renderCard(arrCard);
      lightbox.refresh();
      if (totalHits === gallery.children.length) {
    observer.unobserve(target);
    renderInfo();
  }
    });
  } 
}

function onMakeSubmit(e) {
  e.preventDefault();
  const inputValue = e.currentTarget.searchQuery.value;
  if (inputValue.trim() == '') {
    renderInvalidValue();
  } else {
    gallery.innerHTML = '';
    requestOnBack(inputValue, (currentPage = 1)).then(resp => {
      const arrCard = resp.data.hits;
      const totalHits = resp.data.totalHits;
      if (totalHits === 0) {
        observer.unobserve(target);
        renderErr();
      } else {
        renderCard(arrCard);
        lightbox.refresh();
        observer.observe(target);
      }
    });
  }
}

const requestOnBack = async (value, page = 1) => {
  try {
    const resp = await axios({
      method: 'get',
      url: `${BASE_URL}`,
      params: {
        key: `${API_KEY}`,
        responseType: 'stream',
        q: `${value}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
        page: `${page}`,
      },
    });
    return resp;
  } catch (e) {
    renderErr();
  }
};
