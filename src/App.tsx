import React from 'react';
import styled from 'styled-components';
import { CookiesProvider } from 'react-cookie';
import Footer from './components/Footer';
import View from './components/View/View';
import TruckContextProvider from './contexts/TruckContext';
import Error from './components/Error';

const StyledApp = styled.main`
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
        <TruckContextProvider>
          <View />
          <Error />
        </TruckContextProvider>
        <Footer />
      </CookiesProvider>
    </StyledApp>
  );
}

export default App;
