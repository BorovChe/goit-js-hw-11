import Notiflix from 'notiflix';


function renderInvalidValue() {
      Notiflix.Notify.failure('Invalid value entered!!!');
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

export { renderInvalidValue, renderInfo, renderErr }