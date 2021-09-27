import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';

const GET_NOTES = gql`
    query NoteFeed($cursor: String) {
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
            notes {
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
    }
`;

const Home = () => {

    // Zaczep zapytania.
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
    // Jeżeli dane są wczytywane, należy wyświetlić odpowiedni komunikat.
    if (loading) return <p>Wczytywanie...</p>;
    // Jeżeli podczas pobierania danych wystąpi błąd, należy wyświetlić komunikat błędu.
    if (error) return <p>Błąd!</p>;

    return (
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes} />
            {/* Przycisk będzie wyświetlony tylko wtedy, gdy wartością hasNextPage jest true. */}
            {data.noteFeed.hasNextPage && (
                <Button
                    onClick={() =>
                        fetchMore({
                            variables: {
                                cursor: data.noteFeed.cursor
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {
                                return {
                                    noteFeed: {
                                        cursor: fetchMoreResult.noteFeed.cursor,
                                        hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                        // Dołączenie nowych danych do już znajdujących się na stronie. 
                                        notes: [
                                            ...previousResult.noteFeed.notes,
                                            ...fetchMoreResult.noteFeed.notes],
                                        __typename: 'noteFeed'
                                    }
                                };
                            }
                        })
                    }
                >
                    Więcej
                </Button>
            )}
        </React.Fragment >
    );
};

export default Home;