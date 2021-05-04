import { arrow, remove } from './icons';
import { showDestinations } from './showDestinations';

export const showTrips = () => {
    const trips = JSON.parse(localStorage.getItem('trips'));
    const tripList = document.getElementById('trip-list');
    tripList.innerHTML = '';

    trips.forEach(trip => {
        const { id, tripTitle, startDate, endDate, days } = trip;
        const tripItem = document.createElement('div');
        tripItem.classList.add('trip', 'accordion');
        tripItem.setAttribute('data-accordion', 'item');

        tripItem.innerHTML = `
            <div class="trip__header">
                <div class="trip__title">
                    <span>${tripTitle}</span>
                    <span class="destination__icon icon icon-arrow push-right" data-accordion="toggle">${arrow}</span>
                    <span class="destination__icon icon icon-remove" data-action="remove" data-remove="trip" data-removeid="${id}">${remove}</span>
                </div>
                <div class="trip__details">
                    <p><strong>Your trip start on:</strong> ${startDate} <strong>, end on:</strong> ${endDate}. <strong>Length of the trip:</strong> ${days} Days</p>
                </div>
            </div>
            <div class="trip__destinations" data-accordion="panel">
                <h3>Let's visit some great places!</h3>
                <form id="${id}" class="addDestination">
                    <div class="field">
                        <input type="text" id="city" name="city" placeholder="City" data-dest="city"/>
                    </div>
                    <div class="field__hidden">
                        <input type="text" id="tripId" name="tripId" value="${id}" data-dest="tripId">
                    </div>
                    <div>
                        <button type="submit" class="pushDestination button">Add Destination</button>
                    </div>
                </form>
                <div class="destination-list" data-destination-list="${id}"></div>
            </div>
        `;
        tripList.appendChild(tripItem);
        showDestinations(id);
    });
}