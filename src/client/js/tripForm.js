import { v4 as uuidv4 } from 'uuid';
import moment from 'moment/src/moment';
import { showTrips } from './showTrips';

export const tripForm = () => {

    let trips = localStorage.getItem('trips') ? JSON.parse(localStorage.getItem('trips')) : [];    
    localStorage.setItem('trips', JSON.stringify(trips));
    
    const addTrip = document.getElementById('addTrip');
    const tripsList = document.getElementById('trip-list');

    addTrip.addEventListener('submit', (e) => {
        e.preventDefault();
        const tripTitle = document.getElementById('tripTitle').value;
        let startDate = document.getElementById('startDate').value;
        let endDate = document.getElementById('endDate').value;
        const error = document.querySelector('.form-error');

        if(tripTitle === '' || startDate === '' || endDate === '') {
            error.innerHTML = '<p>All fields need to fee filled!<p>';
        } else {
            error.innerHTML = '';
 
            const start = moment(startDate);
            const end = moment(endDate);
            const days = Math.abs(moment.duration(start.diff(end)).asDays());

            startDate = moment(startDate).format('MMMM, dddd');
            endDate = moment(endDate).format('MMMM, dddd');;

            const tripData = {
                id: uuidv4(),
                tripTitle,
                startDate,
                endDate,
                days
            }
            trips.push(tripData);
            localStorage.setItem('trips', JSON.stringify(trips));
            showTrips();
        }

        
    });
};