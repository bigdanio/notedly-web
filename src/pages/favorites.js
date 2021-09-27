import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
// Import zapytania.
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
    useEffect(() => {
        // Uaktualnienie tytułu strony.
        document.title = 'Ulubione — Notedly';
    });

    const { loading, error, data } = useQuery(GET_MY_FAVORITES);
    // Jeżeli dane są wczytywane, należy wyświetlić odpowiedni komunikat.
    if (loading) return 'Wczytywanie...';
    // Jeżeli podczas pobierania danych wystąpi błąd, należy wyświetlić komunikat błędu.
    if (error) return `Błąd! ${error.message}`;
    // Jeżeli wykonanie zapytania zakończyło się sukcesem i są notatki, należy zwrócić kanał notatek.
    // Natomiast jeżeli wykonanie zapytania zakończyło się sukcesem, ale nie ma notatek, należy wyświetlić 
    // odpowiedni komunikat.
    if (data.me.favorites.length !== 0) {
        return <NoteFeed notes={data.me.favorites} />;
    } else {
        return <p>Brak ulubionych notatek.</p>;
    }
};

export default Favorites;