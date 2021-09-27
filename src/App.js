import React from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

import GlobalStyle from '/components/GlobalStyle';

import Pages from './pages';

// Konfiguracja adresu URI naszego API i bufora.
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// Sprawdzenie tokena i zwrot nagłówków do kontekstu.
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };
});

// Konfiguracja klienta Apollo.
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
});

// Sprawdzenie pod kątem lokalnego tokena.
const data = {
    isLoggedIn: !!localStorage.getItem('token')
};
// Zapis danych bufora podczas początkowego wczytywania strony. 
cache.writeData({ data });
// Zapis danych bufora po jego wyzerowaniu.
client.onResetStore(() => cache.writeData({ data }));

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));