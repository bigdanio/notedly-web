import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo.svg';
import { useQuery, gql } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';

// Import komponentu ButtonAsLink.
import ButtonAsLink from './ButtonAsLink';

const HeaderBar = styled.header`
    width: 100%;
    padding: 0.5em 1em;
    display: flex;
    height: 64px;
    position: fixed;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25); 
    z-index: 1;
`;

const LogoText = styled.h1` 
    margin: 0;
    padding: 0;
    display: inline;
`;

// Zapytanie lokalne.
const IS_LOGGED_IN = gql` 
    {
        isLoggedIn @client
    }
`;

const UserState = styled.div` 
    margin-left: auto;
`;

const Header = props => {
    // Zaczep zapytania dla zalogowanego użytkownika.
    const { data, client } = useQuery(IS_LOGGED_IN);

    return (
        <HeaderBar>
            <img src={logo} alt="Logo Notedly" height="40" />
            <LogoText>Notedly</LogoText>

            {/* Wyświetlenie odpowiedniego łącza, w zależności od tego, czy użytkownik jest zalogowany. */}
            <UserState>
                {data.isLoggedIn ? (
                    <ButtonAsLink
                        onClick={() => {
                            // Usunięcie tokena.
                            localStorage.removeItem('token');
                            // Wyzerowanie bufora aplikacji.
                            client.resetStore();
                            // Uaktualnienie lokalnych informacji o stanie.
                            client.writeData({ data: { isLoggedIn: false } });
                            // Przekierowanie użytkownika na stronę główną.
                            props.history.push('/');
                        }}
                    >
                        Wylogowanie
                    </ButtonAsLink>
                ) : (
                    <p>
                        <Link to={'/signin'}>Logowanie</Link> lub{' '}
                        <Link to={'/signup'}>Rejestracja</Link>
                    </p>
                )}
            </UserState>
        </HeaderBar>
    );
};

export default withRouter(Header);