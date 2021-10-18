// import _ from 'lodash';
import debounce from 'lodash.debounce';

// ----------- refs -----------------
const refs = {
  input: document.getElementById('filter'),
  message: document.querySelector('.message'),
};

// import CountriesApi from './fetchCountries';
// const countriesApiService = new CountriesApi();

// refs.input.addEventListener('input', onInput);
refs.input.addEventListener('input', debounce(onInput, 1000));

function onInput(e) {
  console.log(e.target.value);
  // countriesApiService.fetchCountries(e.target.value);
}

// countriesApiService.fetchCountries();

// const url = 'https://restcountries.com/v2/name/ru';
// fetch('https://restcountries.com/v2/name/ru').then(r => r.json());
// .then(r => console.log(r));

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

// refs.message.innerHTML = myAlert;
