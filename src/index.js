import './css/styles.css';
import { searchCountry } from './fetchCountries';

// const debounce = require('lodash.debounce');
// const searchBox = {
//   input: document.querySelector('#search-box'),
// };

const DEBOUNCE_DELAY = 300;

searchBox.input.addEventListener(
  'input',
  debounce(searchCountry, DEBOUNCE_DELAY)
);