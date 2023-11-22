export const getBadgeImage = (months) =>
  fetch(`http://localhost:9999/api/badge/${months}`)
    .then(res => res.url);
