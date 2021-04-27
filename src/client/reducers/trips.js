const tripsReducerDafaultState = {};

export default (state = tripsReducerDafaultStatem, action) => {
    switch (action.type) {
        case 'ADD_TRIP':
            return [
                ...state,
                action.trip
            ]
    }
};