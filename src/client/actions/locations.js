import uuid from 'uuid';

export const addLocation = (
    {
        title = ''
    } = {}
) => ({
    type: 'ADD_LOCATION',
    location: {
        id: uuid(),
        title
    }
});

export const removeLocation = ({ id } = {}) => ({
    type: 'REMOVE_LOCATION',
    id
});