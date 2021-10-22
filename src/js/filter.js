// import _ from 'lodash';
import debounce from 'lodash.debounce';

// ----------- refs -----------------
const refs = {
  input: document.getElementById('filter'),
  result: document.querySelector('.js-result'),
};

import CountriesApi from './fetchCountries.js';
const countriesApiService = new CountriesApi();

// refs.input.addEventListener('input', onInput);
refs.input.addEventListener('input', debounce(onInput, 1000));

function onInput(e) {
  const find = e.target.value;
  console.log(e.target.value);
  countriesApiService(find);
  // countriesApiService.fetchCountries(e.target.value);

  // fetch(`https://restcountries.com/v2/name/${find}`)
  //   .then(r => r.json())
  //   .then(r => myF(r))
  //   .catch(err => {
  //     console.error('Error: ', err);
  //   });
}

// countriesApiService.fetchCountries();

// const url = 'https://restcountries.com/v2/name/ru';

function myF(arr) {
  clearResultField();
  console.log('arr.length=', arr.length);
  if (arr.length < 1 || arr.length === undefined) console.log('not find ((');
  if (arr.length === 1) getCountryInfo(arr);
  if (arr.length >= 2 && arr.length <= 10) createCountriesList(arr);
  if (arr.length > 10) {
    console.log('Too many matches found. Please enter a more specific query');
    showErrorMessage('Too many matches found. Please enter a more specific query');
  }
}

function clearResultField() {
  refs.result.innerHTML = '';
}

// ====== 2 - 10 countries =======
function createCountriesList(arr) {
  let listItems = '';
  arr.forEach(item => {
    console.log(item.name);
    listItems += `<li>${item.name}</li>`;
    // listItems += `<li><a href="" class="js-country-link">${item.name}</a></li>`;
  });
  console.log(listItems);
  refs.result.innerHTML = `<ul>${listItems}</ul>`;
}

// ====== 1 country ======
function getCountryInfo(arr) {
  const item = arr[0];
  // arr.forEach(item => {
  //   console.log('==== Country:', item.name.toUpperCase(), '====');
  //   console.log('capital:', item.capital);
  //   console.log('population:', item.population);
  //   item.languages.forEach(language => {
  //     console.log('lang:', language.name);
  //   });
  // });
  console.log('==== Country:', item.name.toUpperCase(), '====');
  console.log('capital:', item.capital);
  console.log('population:', item.population);
  item.languages.forEach(language => {
    console.log('lang:', language.name);
  });

  // ======= make  list ===========
  let listLangs = '';
  item.languages.forEach(language => {
    listLangs += `<li class='languages-list__item'>${language.name}</li>`;
  });
  refs.result.innerHTML = `
    <h2 class='country__name'>
      ${item.name.toUpperCase()}
    </h2>
    <div class='country__wrap'>
      <div class='country__info'>
        <p class='country__capital'>
          <span class='bold'>
            Capital:
          </span>
          ${item.capital}
        </p>
        <p class='country__population'>
          <span class='bold'>
            Population:
          </span>
          ${item.population}
        </p>
        <p class='country__languages'>
          <span class='bold'>
            Languages:
          </span>
          <ul class='languages-list'>
            ${listLangs}
          </ul>
        </p>
      </div>
      <div class='country__flag'>
        <img class='' width='100%' src='${item.flag}' alt='flag of Ukraine' />
      </div>
    </div>`;
}

// ========= notify ===============
import { error } from '@pnotify/core'; // from Creating Notices
// import * as PNotifyDesktop from '@pnotify/desktop'; // from Desktop Module
import '@pnotify/core/dist/BrightTheme.css'; // from Styles - Bright Theme
import '@pnotify/core/dist/PNotify.css'; // from Installation React

function showErrorMessage(text) {
  error({
    text: text,
    type: 'error',
    delay: 3000,
    maxTextHeight: null,
    width: '400px',
  });
}

// error({
//   text: 'Моё сообщение',
//   // type: 'error',
//   delay: Infinity,
//   dir1: 'up',
//   dir2: 'right',
//   mode: 'light',
//   firstpos1: 25,
//   firstpos2: 25,
//   spacing1: 36,
//   spacing2: 36,
//   push: 'bottom',
//   context: document.body,
//   positioned: true,
// });

// console.dir(error);
// const myAlert = error({
//   text: "I'm an error.",
//   type: 'error',
//   delay: Infinity,
// });

// refs.result.innerHTML = myAlert;
