import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Navigation from './Navigation';

// Style komponentu.
const Wrapper = styled.div`
    /* W komponentach ze zdefiniowanymi stylami można stosować zapytania o media. */ 
    /* Te style mają zastosowanie tylko dla ekranu większego niż 700 pikseli szerokości. */
    @media (min-width: 700px) {
        display: flex;
        top: 64px;
        position: relative; height: calc(100% - 64px); width: 100%;
        flex: auto;
        flex-direction: column; 
    }
`;

const Main = styled.main` 
    position: fixed;
    height: calc(100% - 185px); 
    width: 100%;
    padding: 1em;
    overflow-y: scroll;
    /* Ponowne zapytanie o media; style tylko dla ekranu większego niż 700 pikseli szerokości. */ 
    @media (min-width: 700px) {
        flex: 1;
        margin-left: 220px; 
        height: calc(100% - 64px); 
        width: calc(100% - 220px);
    } 
`;

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <Wrapper>
                <Navigation />
                <Main>{children}</Main>
            </Wrapper>
        </React.Fragment>
    );
};

export default Layout;