import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

var debounce = require('lodash.debounce');


const DEBOUNCE_DELAY = 300;
// const MESSAGE = 'Too many matches found. Please enter a more specific name.';
// const ERROR_MESSAGE = 'Oops, there is no country with that name';
const inputBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
// const searchBox = {
//   inputBox: document.querySelector('#search-box'),
//   countryList: document.querySelector('.country-list'),
//   countryInfo: document.querySelector('.country-info'),
// };

// console.log(searchBox);

inputBox.addEventListener(
    'input',
    debounce(evt => {
        evt.preventDefault();
        const valueTrim = inputBox.value.trim();
        cleanHtml();
        if (valueTrim !== '') {
            fetchCountries(valueTrim).then(foundData => {
              if (foundData.length > 10) {
                Notiflix.Notify.info(
                  'Too many matches found. Please enter a more specific name.'
                );
              } else if (foundData.length === 0) {
                Notiflix.Notify.failure(
                  'Oops, there is no country with that name'
                );
              } else if (foundData.length >= 2 && foundData.length <= 10) {
                renderCountryList(foundData);
              } else if (foundData.length === 1) {
                renderOneCountry(foundData);
              }
            });
        }
    }, DEBOUNCE_DELAY)
);

  function renderCountryList(countries) {
      const markup = countries
      .map(country => 
        `<li>
        <img src="${country.flags.svg}" alt="${country.name.official}" width="30" hight="20">
           <h2>${country.name.official}</h2>
                  </li>`
      )
      .join('');
    countryList.innerHTML = markup;
  }

// ?????  .reduce(
    //     (acc, { name, flags } = country) =>
    //       acc +
    //       ` <li class="temp-list__item">
    //             <img class="flag" src="${flags.svg}" alt="${name.official}" width="30" height="auto" />
    //             <h2 class="temp-list__name">${name.official}</h2>
    //         </li>`,
    //     ''
    //   );


function renderOneCountry(countries) {
  const markup = countries
    .map(
      country =>
        `<h1>
    <img src="${country.flags.svg}" alt="Flag of ${
          country.name.official
        }" width="30" hight="20">
      ${country.name.official}</h1>
        <p>${country.name.official}</p>
        <p>Capital: <span>${country.capital}</span></p>
        <p>Population: <span>${country.population}</span></p>
        <p>Languages: <span>${Object.values(country.languages)} </span></p>`
    )
    .join('');
  countryList.innerHTML = markup;
}

function cleanHtml() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}


// inputBox.addEventListener(
//   'input',
//   debounce(onSearchCountry, DEBOUNCE_DELAY)
// );

// function emptyMarkup(ref) {
//   ref.innerHTML = '';
// }

// function emptyMarkup(countryList, countryInfo) {
//   countryList.innerHTML = '';
//   countryInfo.innerHTML = '';
// }

// function onSearchCountry(evt) {
//     evt.preventDefault();
//     const textForm = evt.target.value.trim();

//     if (!textForm) {
//         emptyMarkup(countryList);
//         emptyMarkup(countryInfo);
//         return
//     }
//     fetchCountries(textForm)
//         .then(countries => {
//             console.log(countries);
//             if (countries.length > 10) {
//                 Notify.info(MESSAGE);
//                 return;
//             } renderMarkup(countries);
//         })
//         .catch(error => {
//             emptyMarkup(countryList);
//             emptyMarkup(countryInfo);
//             Notify.failure(ERROR_MESSAGE);
//         });
// }

// function renderMarkup(countries) {
//     if (countries.length === 1) {
//         emptyMarkup(searchBox.countryList);
//         searchBox.countryInfo.innerHTML = infoCountriesMarkup(countries);
//     } else {emptyMarkup(searchBox.countryInfo);
//         searchBox.countryList.innerHTML = listCountriesMarkup(countries);
//     }
// }

// function listCountriesMarkup(countries) {
//     return countries
//         .map(
//             ({ name, flags }) =>
//                 `<li><img src="${flags.svg}" 
//         alt="${name.official}" 
//         width = "50" height = "auto">${name.official}</li>`
//         )
//         .join('');
// }
//    //     .reduce((acc, { name, flags } = country) =>
//         //     acc +
//         //     `<li>
//         //         <img src="${flags.svg}" alt="${name.official}" width="30" height="auto"/>
//         //             <h2>${name.official}</h2>
//         //         </li>`,
//         //   ''
//         // );

// function infoCountriesMarkup({ name, capital, population, flags, languages }) {
//         return `<h1>
//     <img src="${flags.svg}" alt="${name.official}" width = "60" height = "auto">
//     ${name.official}</h1>
//     <p>Capital: <span>${capital}</span></p>
//     <p>Population: <span>${population}</span></p>
//     <p>Languages: <span>${Object.values(languages)}</span></p>`
//     }

// function renderCountriesListMarkup(countries) {
//   const shortMarkup = countries.reduce(
//     (acc, { name, flags } = country) =>
//       acc +
//       ` <li class="temp-list__item">
//                 <img class="flag" src="${flags.svg}" alt="${name.official}" width="30" height="auto" />
//                 <h2 class="temp-list__name">${name.official}</h2>
//             </li>`,
//     ''
//   );
//   return shortMarkup;
// }

// function renderFullInfoMarkup(countries) {
//   const singleMarkup = (
//     { name, capital, flags, population, languages } = countries[0]
//   ) => {
//     const fullCountryInfoMarkup = `<div class="country-card">
//             <div class="flag-and-name">
//                 <img class="flag" src="${flags.svg}" alt="${name.official}" width="50" height="auto" />
//                 <h2 class="country-name">${name.official}</h2>
//             </div>
            
//             <ul class="list additional-info">
//                 <li class="info-item">
//                     <h3 class="info-name"> Capital: </h3> 
//                     <h3 class="info-value"> 
//                     ${capital}</h3>
//                 </li>
//                 <li class="info-item"> 
//                     <h3 class="info-name"> Population: </h3>
//                     <h3 class="info-value"> 
//                     ${population}</h3>
//                 </li>
//                 <li class="info-item">
//                     <h3 class="info-name"> Languages:</h3>
//                     <h3 class="info-value">
//                     ${Object.values(languages).join(', ')}</h3>
//                 </li>
//             </ul>
//         </div>`;
//     //console.log('fullCountryInfoMarkup : ', fullCountryInfoMarkup);

//     return fullCountryInfoMarkup;
//   };

//   return singleMarkup();
// }
