import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {

    // Umieszczenie w zmiennej identyfikatora znalezionego w adresie URL.
    const id = props.match.params.id;
    // Zdefiniowanie zapytania.
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
    // Pobranie danych bieżącego użytkownika.
    const { loading: ladowanie, error: blad, data: userdata } = useQuery(GET_ME);

    // Zdefiniowanie mutacji.
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    });

    if (ladowanie) return 'Wczytywanie...';
    // Jeżeli podczas pobierania danych wystąpi błąd, należy wyświetlić komunikat błędu.
    if (blad) return <p>Błąd!</p>;

    // Jeżeli dane są wczytywane, należy wyświetlić odpowiedni komunikat.
    if (loading) return 'Wczytywanie...';
    // Jeżeli podczas pobierania danych wystąpi błąd, należy wyświetlić komunikat błędu.
    if (error) return <p>Błąd!</p>;
    // Jeżeli bieżący użytkownik nie jest autorem notatki, trzeba wyświetlić odpowiedni komunikat.
    if (userdata.me.id !== data.note.author.id) {
        return <p>Nie możesz edytować tej notatki.</p>;
    }
    // Przekazanie danych i mutacji do komponentu form.
    return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;