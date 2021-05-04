import { accordions } from './js/accordions';
import { removeItem } from './js/removeItem';
import { destinationForm } from './js/destinationForm';
import { tripForm } from './js/tripForm';
import { showTrips } from './js/showTrips';
import { getBackground } from './js/getBackground';
import './styles/style.scss';

getBackground();
tripForm();
showTrips();
destinationForm();
accordions();
removeItem();