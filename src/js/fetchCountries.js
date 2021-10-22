export default class CountriesApi {
  constructor() {}

  fetchCountries(searchQuery) {
    const url = `https://restcountries.com/v2/name/${searchQuery}`;
    fetch(url)
      .then(r => r.json())
      .then(r => myF(r))
      .catch(err => {
        console.error('Error: ', err);
      });
    // .then(r => console.log(r));
  }
}
// fetch('https://restcountries.com/v2/name/ru').then(r => r.json());
