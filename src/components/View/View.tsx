import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SanFrancisco from '../../pages/SanFrancisco';
import Splash from '../../pages/Splash';

const StyledView = styled.div`
  height: 100%;
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
  /* <PoseGroup /> container element */
  > div {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

function View() {
  return (
    <StyledView>
      <Router>
        <Routes>
          <Route path="/san-francisco" element={<SanFrancisco />} />
          <Route path="/" element={<Splash />} />
        </Routes>
      </Router>
    </StyledView>
  );
}

export default View;
