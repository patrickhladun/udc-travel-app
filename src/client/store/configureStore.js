import { createStore, combineReducers } from 'redux';
import tripsReducer from '../reducers/trips';
import notesReducer from '../reducers/notes';

export default () => {
    const store = createStore(
        combineReducers({
            trips: tripsReducer,
            notes: notesReducer
        })
    );

    return store;
};
