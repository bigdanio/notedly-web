import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password) }
`;

const SignUp = props => {
    useEffect(() => {
        // Uaktualnienie tytułu strony.
        document.title = 'Rejestracja — Notedly';
    });

    const client = useApolloClient();
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // Przechowywanie tokena.
            localStorage.setItem('token', data.signUp);
            // Uaktualnienie bufora lokalnego.
            client.writeData({ data: { isLoggedIn: true } });
            // Przekierowanie użytkownika na stronę główną.
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {/* Jeżeli dane są wczytywane, należy wyświetlić odpowiedni komunikat. */}
            {loading && <p>Wczytywanie...</p>}
            {/* Jeżeli wystąpi błąd, należy wyświetlić komunikat błędu. */}
            {error && <p>Błąd podczas tworzenia konta!</p>}
        </React.Fragment>
    );
};

export default SignUp;