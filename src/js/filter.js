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
  // countriesApiService.fetchCountries(e.target.value);

  fetch(`https://restcountries.com/v2/name/${find}`)
    .then(r => r.json())
    .then(r => myF(r))
    .catch(err => {
      console.error('Error: ', err);
    });
}

// countriesApiService.fetchCountries();

// const url = 'https://restcountries.com/v2/name/ru';

function myF(arr) {
  console.log('arr.length=', arr.length);
  if (arr.length < 1 || arr.length === undefined) console.log('not find ((');
  if (arr.length === 1) getCountryInfo(arr);
  if (arr.length >= 2 && arr.length <= 10) getCountriesList(arr);
  if (arr.length > 10) console.log('Too many matches found. Please enter a more specific query');
}

// ====== 2 - 10 countries ======
function getCountriesList(arr) {
  let listItems = '';
  arr.forEach(item => {
    console.log(item.name);
    listItems += `<li>${item.name}</li>`;
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
}

// ========= notify ===============
import { error } from '@pnotify/core'; // from Creating Notices
// import * as PNotifyDesktop from '@pnotify/desktop'; // from Desktop Module
import '@pnotify/core/dist/BrightTheme.css'; // from Styles - Bright Theme
import '@pnotify/core/dist/PNotify.css'; // from Installation React

error({
  text: 'Моё сообщение',
  // type: 'error',
  delay: Infinity,
  dir1: 'up',
  dir2: 'right',
  mode: 'light',
  firstpos1: 25,
  firstpos2: 25,
  spacing1: 36,
  spacing2: 36,
  push: 'bottom',
  context: document.body,
  positioned: true,
});

// console.dir(error);
// const myAlert = error({
//   text: "I'm an error.",
//   type: 'error',
//   delay: Infinity,
// });

// refs.result.innerHTML = myAlert;
