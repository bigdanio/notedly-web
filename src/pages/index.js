import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import Layout from '../components/Layout';

import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';
import SignUp from './signup';
import SignIn from './signin';
import NewNote from './new';
import EditNote from './edit';

const IS_LOGGED_IN = gql` 
    {
        isLoggedIn @client
    }
`;

const Pages = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/mynotes" component={MyNotes} />
                <PrivateRoute path="/favorites" component={Favorites} />
                <Route path="/note/:id" component={NotePage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <PrivateRoute path="/new" component={NewNote} />
                <PrivateRoute path="/edit/:id" component={EditNote} />
            </Layout>
        </Router>
    );
};

// Dodanie komponentu PrivateRoute za komponentem `Pages`.
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    // Jeżeli dane są wczytywane, należy wyświetlić odpowiedni komunikat. 
    if (loading) return <p>Wczytywanie...</p>;
    // Jeżeli podczas pobierania danych wystąpi błąd, należy wyświetlić odpowiedni komunikat.
    if (error) return <p>Błąd!</p>;
    // Jeżeli użytkownik jest zalogowany, trzeba przekierować go do żądanego komponentu. 
    // W przeciwnym razie należy przekierować użytkownika na stronę logowania.
    return (
        <Route
            {...rest}
            render={props =>
                data.isLoggedIn === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

export default Pages;