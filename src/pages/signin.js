import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForm';

const SIGNIN_USER = gql`
    mutation signIn($email: String, $password: String!) {
        signIn(email: $email, password: $password) }
`;

const SignIn = props => {
    useEffect(() => {
        // Uaktualnienie tytułu strony.
        document.title = 'Logowanie — Notedly';
    });

    const client = useApolloClient();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: data => {
            // Przechowywanie tokena.
            localStorage.setItem('token', data.signIn);
            // Uaktualnienie bufora lokalnego.
            client.writeData({ data: { isLoggedIn: true } });
            // Przekierowanie użytkownika na stronę główną.
            props.history.push('/');
        }
    });

    return (
        <React.Fragment>
            <UserForm action={signIn} formType="signIn" />
            {/* Jeżeli dane są wczytywane, należy wyświetlić odpowiedni komunikat. */}
            {loading && <p>Wczytywanie...</p>}
            {/* Jeżeli wystąpi błąd, należy wyświetlić komunikat błędu. */}
            {error && <p>Błąd podczas logowania!</p>}
        </React.Fragment>
    );
};

export default SignIn;