import { destinationForm, tripForm, showTrips } from './js/app';
import './styles/style.scss';

tripForm();
showTrips();
destinationForm();

const button = document.getElementById('clear');
button.addEventListener('click', function (e) {
    e.preventDefault;
    localStorage.clear();
});