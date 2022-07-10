import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import View from './components/View/View';
import TruckContextProvider from './contexts/TruckContext';
import Error from './components/Error';

const StyledApp = styled.main`
  min-height: 100vh;
  overflow: hidden;
  .title {
    margin-top: 0;
    margin-bottom: 0;
  }
  .location {
    margin-top: 0;
  }
`;

function App() {
  return (
    <StyledApp className="App">
      <CookiesProvider>
        <Router>
          <TruckContextProvider>
            <Header />
            <View />
            <Error />
          </TruckContextProvider>
          <Footer />
        </Router>
      </CookiesProvider>
    </StyledApp>
  );
}

export default App;
