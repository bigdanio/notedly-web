import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';

const MyNotes = () => {
    useEffect(() => {
        // Uaktualnienie tytułu strony.
        document.title = 'Moje notatki — Notedly';
    });

    const { loading, error, data } = useQuery(GET_MY_NOTES);
    // Jeżeli dane są wczytywane, należy wyświetlić odpowiedni komunikat.
    if (loading) return 'Wczytywanie...';
    // Jeżeli podczas pobierania danych wystąpi błąd, należy wyświetlić komunikat błędu.
    if (error) return `Błąd! ${error.message}`;
    // Jeżeli wykonanie zapytania zakończyło się sukcesem i są notatki, należy zwrócić kanał notatek.
    // Natomiast jeżeli wykonanie zapytania zakończyło się sukcesem, ale nie ma notatek, należy wyświetlić 
    // odpowiedni komunikat.
    if (data.me.notes.length !== 0) {
        return <NoteFeed notes={data.me.notes} />;
    } else {
        return <p>Nie ma jeszcze żadnych notatek.</p>;
    }
};

export default MyNotes;