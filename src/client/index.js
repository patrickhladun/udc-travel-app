import { accordions } from './js/accordions';
import { removeItem } from './js/removeItem';
import { destinationForm } from './js/destinationForm';
import { tripForm } from './js/tripForm';
import { showTrips } from './js/showTrips';
import { getBackground } from './js/getBackground';
import './styles/style.scss';

// TODO: add mobile styles
// TODO: add hover stated
// TODO: add validation to add a trip form and display errors
// TODO: pull countries and cities
// TODO: fix issues with double trips adding up
// TODO: filter trips
// TODO: update date fields to not be able to select previous dates
// TODO: add service workers
// TODO: fix styles naming
// TODO: add images where images is not available

getBackground();
tripForm();
showTrips();
destinationForm();
accordions();
removeItem();