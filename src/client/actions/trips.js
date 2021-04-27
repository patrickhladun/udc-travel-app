import uuid from 'uuid';

export const addTrip = (
    {
        title = '',
        startDate = '',
        endDate = '',
        notes = {},
        locations = {}
    } = {}
) => ({
    type: 'ADD_TRIP',
    trip: {
        id: uuid(),
        title,
        startDate,
        endDate,
        notes,
        locations
    }
});

export const removeTrip = ({ id } = {}) => ({
    type: 'REMOVE_TRIP',
    id
});