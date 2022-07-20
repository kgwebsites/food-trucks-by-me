import React from 'react';
import styled from 'styled-components';
import { CookiesProvider } from 'react-cookie';
import Footer from './components/Footer';
import View from './components/View/View';

const StyledApp = styled.main`
  height: 100vh;
  max-height: -webkit-fill-available;
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
        <View />
        <Footer />
      </CookiesProvider>
    </StyledApp>
  );
}

export default App;
