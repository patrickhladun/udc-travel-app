const notesReducerDafaultState = [];

export default (state = notesReducerDafaultState, action) => {
    switch (action.type) {
        case 'ADD_NOTE':
            return [
                ...state,
                action.note
            ]
        default:
            return state;
    }
};