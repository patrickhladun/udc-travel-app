import e from 'cors';
import { destinationForm, tripForm } from './js/app';
import './styles/style.scss';


let destinations = localStorage.getItem('destinations') ? JSON.parse(localStorage.getItem('destinations')) : [];

tripForm();

const button = document.getElementById('clear');
button.addEventListener('click', function (e) {
    e.preventDefault;
    localStorage.clear();
    console.log(localStorage);
});