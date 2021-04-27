import { createStore, combineReducers } from 'redux';
import tripsReducer from '../reducers/trips';

const store = createStore(
    combineReducers({
        trips: tripsReducer
    })
);