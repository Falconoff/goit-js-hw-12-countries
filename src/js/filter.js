import debounce from 'lodash.debounce';
import cardTemplate from '../templates/country-card.hbs';
import CountriesApi from './fetchCountries.js';
// ========= notify ===============
import { error } from '@pnotify/core'; // from Creating Notices
// import * as PNotifyDesktop from '@pnotify/desktop'; // from Desktop Module
import '@pnotify/core/dist/BrightTheme.css'; // from Styles - Bright Theme
import '@pnotify/core/dist/PNotify.css'; // from Installation React

// ----------- refs -----------------
const refs = {
  input: document.getElementById('filter'),
  result: document.querySelector('.js-result'),
};

// ВВОДИМ ЗАПРОС
refs.input.addEventListener('input', debounce(onInput, 1000));

const countriesApiService = new CountriesApi();

function onInput(e) {
  clearResultField();
  countriesApiService.query = e.target.value;
  countriesApiService.fetchCountries().then(res => doAnalysis(res));
}

function clearResultField() {
  refs.result.innerHTML = '';
}

function doAnalysis(arr) {
  if (arr.length < 1 || arr.length === undefined) {
    showErrorMessage('No matches found.');
  }
  if (arr.length === 1) makeCountryCard(arr);
  if (arr.length >= 2 && arr.length <= 10) createCountriesList(arr);
  if (arr.length > 10) {
    showErrorMessage('Too many matches found. Please enter a more specific query');
  }
}

// make list of 2-10 Countries
function createCountriesList(arr) {
  let listItems = '';
  arr.forEach(item => {
    listItems += `<li><a href="" class="country-link js-country-link" data-value="${item.name}">${item.name}</a></li>`;
  });
  refs.result.innerHTML = `<ul>${listItems}</ul>`;
}

// ======  make click on one of the found Country ======
refs.result.addEventListener('click', onCountryLinkClick);

function onCountryLinkClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('js-country-link')) {
    return;
  }
  refs.input.value = evt.target.dataset.value;
  countriesApiService.query = evt.target.dataset.value;
  countriesApiService.fetchCountries().then(res => makeCountryCard(res));
}

// ====== for 1 country ======
function makeCountryCard(arr) {
  refs.result.innerHTML = cardTemplate(arr[0]);
}

// Notify function
function showErrorMessage(text) {
  error({
    text: text,
    type: 'error',
    delay: 3000,
    maxTextHeight: null,
    width: '400px',
  });
}
