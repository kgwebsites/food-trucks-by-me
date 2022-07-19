import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SanFrancisco from '../../pages/SanFrancisco';
import Splash from '../../pages/Splash';
import TruckContextProvider from '../../contexts/TruckContext';
import Error from '../Error';

const StyledView = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .fade {
    opacity: 0;
  }
  .fade-active {
    opacity: 1;
    transition: opacity 200ms;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`;

function View() {
  return (
    <StyledView>
      <Router>
        <Routes>
          <Route
            path="/san-francisco"
            element={
              <TruckContextProvider city="San Francisco">
                <SanFrancisco />
                <Error />
              </TruckContextProvider>
            }
          />
          <Route path="/" element={<Splash />} />
        </Routes>
      </Router>
    </StyledView>
  );
}

export default View;
