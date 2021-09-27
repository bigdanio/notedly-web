import React from 'react';
import { useQuery, gql } from '@apollo/client';

import Note from '../components/Note';

// Zapytanie notatki pobierające zmienną identyfikatora.
const GET_NOTE = gql` 
    query note($id: ID!) {
        note(id: $id) {
        id
        createdAt
        content
        favoriteCount
            author {
                username
                id
                avatar
            } 
        }
    } 
`;

const NotePage = props => {
    // Identyfikator z adresu URL jest przechowywany w zmiennej.
    const id = props.match.params.id;

    // Zaczep zapytania, przekazanie wartości id jako zmiennej.
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

    // Jeżeli dane są wczytywane, należy wyświetlić odpowiedni komunikat.
    if (loading) return <p>Wczytywanie...</p>;

    // Jeżeli podczas pobierania danych wystąpi błąd, należy wyświetlić komunikat błędu.
    if (error) return <p>Błąd! Notatka nie została znaleziona.</p>;

    // Jeżeli pobranie danych zakończyło się sukcesem, należy wyświetlić te dane w interfejsie użytkownika.
    return <Note note={data.note} />;
};

export default NotePage;