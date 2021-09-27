import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

// Import zapytania GET_ME.
import { GET_ME } from '../gql/query';
import DeleteNote from './DeleteNote';
import FavoriteNote from './FavoriteNote';

const NoteUser = props => {
    const { loading, error, data } = useQuery(GET_ME);
    // Jeżeli dane są wczytywane, należy wyświetlić odpowiedni komunikat.
    if (loading) return <p>Wczytywanie...</p>;
    // Jeżeli podczas pobierania danych wystąpi błąd, należy wyświetlić komunikat błędu. 
    if (error) return <p>Błąd!</p>;
    return (
        <React.Fragment>
            <FavoriteNote
                me={data.me}
                noteId={props.note.id}
                favoriteCount={props.note.favoriteCount}
            />
            <br />
            {data.me.id === props.note.author.id && (
                <React.Fragment>
                    <Link to={`/edit/${props.note.id}`}>Edytuj</Link><br />
                    <DeleteNote noteId={props.note.id} />
                </React.Fragment>
            )}
        </React.Fragment>);
};

export default NoteUser;