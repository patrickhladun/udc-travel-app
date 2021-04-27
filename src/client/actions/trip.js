import { v4 as uuidv4 } from 'uuid';

export const actionAddTrip = (
    {
        title = '',
        startDate = '',
        endDate = ''
    } = {}
) => ({
    type: 'ADD_TRIP',
    trip: {
        id: uuidv4(),
        title,
        startDate,
        endDate
    }
});

export const actionRemoveTrip = ({ id } = {}) => ({
    type: 'REMOVE_TRIP',
    id
});