import uuid from 'uuid';

export const addNotes = (
    {
        note = ''
    } = {}
) => ({
    type: 'ADD_NOTES',
    note: {
        id: uuid(),
        note
    }
});

export const removeNotes = ({ id } = {}) => ({
    type: 'REMOVE_NOTES',
    id
});