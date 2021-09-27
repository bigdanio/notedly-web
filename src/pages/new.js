import React, { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

import NoteForm from '../components/NoteForm';

import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username 
            }
            author {
                username
                id
            } 
        }
    }   
`;

const NewNote = props => {
    useEffect(() => {
        // Uaktualnienie tytułu strony.
        document.title = 'Nowa notatka — Notedly';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
        onCompleted: data => {
            // Po zakończeniu operacji należy przekierować użytkownika na stronę notatki.
            props.history.push(`note/${data.newNote.id}`);
        }
    });

    return (
        <React.Fragment>
            {/* Jeżeli dane są wczytywane, należy wyświetlić odpowiedni komunikat. */}
            {loading && <p>Wczytywanie...</p>}
            {/* Jeżeli wystąpi błąd, należy wyświetlić komunikat błędu. */}
            {error && <p>Błąd podczas zapisywania notatki.</p>}
            {/* Komponent formularza; dane mutacji są przekazywane jako właściwość. */}
            <NoteForm action={data} />
        </React.Fragment>
    );
};

export default NewNote;