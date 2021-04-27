import uuid from 'uuid';

export const actionAddDestination = (
    {
        title = ''
    } = {}
) => ({
    type: 'ADD_DESTINATION',
    destination: {
        id: uuid(),
        title
    }
});

export const actionRemoveDestination = ({ id } = {}) => ({
    type: 'REMOVE_DESTINATION',
    id
});