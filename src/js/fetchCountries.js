const baseApiUrl = `https://restcountries.com/v3.1/name/`;
const fieldsParams = ['name', 'capital', 'population', 'flags', 'languages'].join(',');

export default function fetchCountries(nameCountry) {
    return fetch(`${baseApiUrl}${nameCountry}?fields=${fieldsParams}`)
        .then(response => {
            if (!response.ok) {
            throw new Error(response.status)
            }
            return response.json()
        })
};