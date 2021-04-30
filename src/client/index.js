import { destinationForm, tripForm, showTrips, getBackground, accordions } from './js/app';
import './styles/style.scss';

getBackground();
tripForm();
showTrips();
destinationForm();
accordions();


console.log(localStorage);

const button = document.getElementById('clear');
button.addEventListener('click', function (e) {
    e.preventDefault;
    const tripList = document.getElementById('trip-list');
    tripList.innerHTML = '';
    localStorage.clear();
});