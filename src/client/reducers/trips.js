const tripsReducerDafaultState = [];

export default (state = tripsReducerDafaultState, action) => {
    switch (action.type) {
        case 'ADD_TRIP':
            return [
                ...state,
                action.trip
            ]
        default:
            return state;
    }
};