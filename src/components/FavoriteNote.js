import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import ButtonAsLink from './ButtonAsLink';
// Dodanie mutacji TOGGLE_FAVORITE.
import { TOGGLE_FAVORITE } from '../gql/mutation';
// Dodanie zapytania GET_MY_FAVORITES do ponownie pobieranych.
import { GET_MY_FAVORITES } from '../gql/query';

const FavoriteNote = props => {
    // Liczba ulubionych notatek jest przechowywana w postaci informacji o stanie.
    const [count, setCount] = useState(props.favoriteCount);
    // Uwzględnienie notatki, jeśli użytkownik oznaczył ją jako ulubioną za pomocą informacji o stanie.
    const [favorited, setFavorited] = useState(
        // Sprawdzenie, czy notatka znajduje się na liście ulubionych notatek użytkownika.
        props.me.favorites.filter(note => note.id === props.noteId).length > 0
    );


    // Zaczep mutacji toggleFavorite.
    const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
        variables: {
            id: props.noteId
        },
        // Ponowne pobranie zapytania GET_MY_FAVORITES, aby uaktualnić bufor.
        refetchQueries: [{ query: GET_MY_FAVORITES }]
    });

    return (
        <React.Fragment>
            {favorited ? (
                <ButtonAsLink
                    onClick={() => {
                        toggleFavorite();
                        setFavorited(false);
                        setCount(count - 1);
                    }}
                >
                    Usuń z listy ulubionych
                </ButtonAsLink>
            ) : (
                <ButtonAsLink
                    onClick={() => {
                        toggleFavorite();
                        setFavorited(true);
                        setCount(count + 1);
                    }}
                >
                    Dodaj jako ulubioną
                </ButtonAsLink>
            )}
            : {count}
        </React.Fragment>);
};

export default FavoriteNote;