import './css/styles.css';
import searchCountryApi from './js/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(inputCountrySeach, DEBOUNCE_DELAY))

function inputCountrySeach (event) {
    // searchCountryApi('usa');
    const inputTextCountry = event.target.value.trim();
    // console.log(inputTextCountry)

    if (inputTextCountry === '') {
        removeTextContent();
        return
    }

      searchCountryApi(inputTextCountry)
        .then(renderTextContent)
        .catch((error) =>
        Notify.failure("Oops, there is no country with that name"))
};

function renderTextContent(countries) {
    removeTextContent()
    if (countries.length > 10 ) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    }
    else if (countries.length > 1) {
        renderTextCountriesList(countries);
    }
    else if (countries.length === 1) {
        renderTextCountryInfo(countries);
    }
};

function renderTextCountriesList(countries) { 
    countryListEl.innerHTML = countries
        .map(({ name, flags }) => {
            return `<li class="country-list__item">
            <img class="country-item__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 30><p class="country-item__name">${name.official}</p>
            </li>`
        }).join('');
};

function renderTextCountryInfo(countries) {
    countryInfoEl.innerHTML = countries
        .map(({ name, capital, population, flags, languages }) => {
            return `
            <h2 class="country-info__name"><img class="country-item__flag" src="${flags.svg}" alt="Flag of ${name.official}" width=40>${name.official}</h2>
        <ul class="country-info__list">
        <li class="country-info__item"><p><span class="country-info__text">Capital:</span> ${capital}</p></li>
        <li class="country-info__item"><p><span class="country-info__text">Population:</span> ${population}</p></li>
        <li class="country-info__item"><p><span class="country-info__text">Languages:</span> ${Object.values(languages)}</p></li> 
        </ul>`
        }).join('');
}

function removeTextContent() {
    countryListEl.innerHTML = '';
    countryInfoEl.innerHTML = '';
};