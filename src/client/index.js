import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { actionAddTrip } from './actions/trip';
import Header from './components/Header/header';
import AddTrip from './components/Trip/AddTrip';
import TripList from './components/Trip/TripList';
import Footer from './components/Footer/footer';
import './styles/style.scss';

const store = configureStore();

// add trip including trip name and description start date and end date

// add location to the trip
// use an API to get a list of countries
// use an API to get list of cities of the coutry
// add the the location to the trip
// use an API to display city actual weather and forecast for a week
// use an API to get city photgraph

// add notes to the trip

store.dispatch(actionAddTrip({
    title: 'This is my first trip',
    startDate: 'start date',
    endDate: 'end date'
}));

store.dispatch(actionAddTrip({
    title: 'This is my first trip 2',
    startDate: 'start date',
    endDate: 'end date'
}));

console.log(store.getState());

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Header />
                <AddTrip />
                <TripList />
                <Footer />
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app') );