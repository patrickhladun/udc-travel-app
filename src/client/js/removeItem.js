import { showDestinations } from './showDestinations';
import { showTrips } from './showTrips';

/**
 * Add a trip to localStorage by submitting trip form
 */
export const removeItem = () => {
    document.querySelector('body').addEventListener('click', e => {
        if(e.target.matches("[data-action='remove']")) {
            const removeItem = e.target.getAttribute('data-remove');
            const itemId = e.target.getAttribute('data-removeid')
            
            if(removeItem === 'trip') {
                const items = JSON.parse(localStorage.getItem('trips'));
                const filtered = items.filter(item => item.id !== itemId);
                localStorage.setItem('trips', JSON.stringify(filtered));
                showTrips();
            } else if(removeItem === 'dest') {
                const tripId = e.target.getAttribute('data-tripid');
                const items = JSON.parse(localStorage.getItem('destinations'));
                const filtered = items.filter(item => item.id !== itemId);
                localStorage.setItem('destinations', JSON.stringify(filtered));
                showDestinations(tripId);
            }
        }
    });
}