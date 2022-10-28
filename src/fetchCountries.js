// const URL = 'https://restcountries.com';
// const FILTER_COUNTRIES = 'name, capital, population, flags, languages';

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name, capital, population, flags, languages`
  )
    .then(response => {
      if (!response.ok || response.status === 404) {
        throw new Error('Oops, there is no country with that name');
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops, there is no country with that name',
        emptyMarkup()
      );
    });
}
