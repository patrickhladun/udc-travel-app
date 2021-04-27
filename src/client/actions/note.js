import uuid from 'uuid';

export const actionAddNote = (
    {
        note = ''
    } = {}
) => ({
    type: 'ADD_NOTE',
    note: {
        id: uuid(),
        note
    }
});

export const actionRemoveNote = ({ id } = {}) => ({
    type: 'REMOVE_NOTE',
    id
});