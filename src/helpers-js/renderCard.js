function renderCard(arr) {
  return arr
    .map(
      card => `
      <div class="photo-card">
  <img class="img_card" src="${card.webformatURL}" alt="${card.tags}" widht="300" height="200" loading="lazy"/> 
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${card.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${card.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${card.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${card.downloads}
    </p>
  </div>
</div>
`).join('');
}

export { renderCard };
