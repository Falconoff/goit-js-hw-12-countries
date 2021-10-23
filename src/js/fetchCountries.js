export default class CountriesApi {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    const url = `https://restcountries.com/v2/name/${this.searchQuery}`;
    return fetch(url)
      .then(r => r.json())
      .then(res => {
        return res;
      })
      .catch(err => {
        console.error('Error: ', err);
      });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
