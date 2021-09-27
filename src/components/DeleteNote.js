import React from 'react';
import { useMutation } from '@apollo/client';
import { withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';
// Import mutacji DELETE_NOTE.
import { DELETE_NOTE } from '../gql/mutation';
// Import zapytań do wykonania po usunięciu notatki.
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

const DeleteNote = props => {
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteId
        },
        // Ponowne pobranie listy zapytań w celu uaktualnienia bufora.
        refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
        onCompleted: data => {
            // Przekierowanie użytkownika na stronę "Moje notatki".
            props.history.push('/mynotes');
        }
    });

    return <ButtonAsLink onClick={deleteNote}>Usuń notatkę</ButtonAsLink>;
};

export default withRouter(DeleteNote);