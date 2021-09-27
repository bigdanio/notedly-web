import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale/pl';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

// Import komponentów interfejsu zalogowanego użytkownika.
import NoteUser from './NoteUser';
// Import zapytania lokalnego IS_LOGGED_IN.
import { IS_LOGGED_IN } from '../gql/query';

// Szerokość notatki nie może przekroczyć 800 pikseli.
const StyledNote = styled.article` 
    max-width: 800px;
    margin: 0 auto;
`;

// Nadanie stylu metadanym notatki.
const MetaData = styled.div` 
    @media (min-width: 500px) {
        display: flex;
        align-items: top; 
    }
`;

// Dodanie wolnego miejsca między awatarem a informacjami.
const MetaInfo = styled.div` 
    padding-right: 1em;
`;

// Na dużym ekranie element 'UserActions' ma być dosunięty do prawej strony.
const UserActions = styled.div` 
    margin-left: auto;
`;

const Note = ({ note }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    // Jeżeli dane są wczytywane, należy wyświetlić odpowiedni komunikat.
    if (loading) return <p>Wczytywanie...</p>;
    // Jeżeli podczas pobierania danych wystąpi błąd, należy wyświetlić komunikat błędu. 
    if (error) return <p>Błąd!</p>;

    return (
        <StyledNote>
            <MetaData>
                <MetaInfo>
                    <img
                        src={note.author.avatar}
                        alt="{note.author.username} avatar"
                        height="50px"
                    />
                </MetaInfo>
                <MetaInfo>
                    <em>autor</em> {note.author.username} <br />
                    {format(note.createdAt, 'Do MMM YYYY', { locale: pl })}
                </MetaInfo>
                {data.isLoggedIn ? (
                    <UserActions>
                        <NoteUser note={note} />
                    </UserActions>
                ) : (
                    <UserActions>
                        <em>Ulubione:</em> {note.favoriteCount}
                    </UserActions>
                )}
            </MetaData>
            <ReactMarkdown source={note.content} />
        </StyledNote>
    );
};

export default Note;