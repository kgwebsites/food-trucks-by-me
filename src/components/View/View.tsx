import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';
import FoodMap from '../FoodMap/FoodMap';
import FoodList from '../FoodList/FoodList';
import ResultFilters from '../ResultFilters/ResultFilters';
import Settings from '../Settings/Settings';

const StyledView = styled.div`
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

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 },
});

function View() {
  const location = useLocation();
  return (
    <StyledView>
      <PoseGroup>
        <RouteContainer key={location.pathname}>
          <Routes location={location}>
            <Route path="/list" element={<FoodList />} />
            <Route path="/filter" element={<ResultFilters />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<FoodMap />} />
          </Routes>
        </RouteContainer>
      </PoseGroup>
    </StyledView>
  );
}

export default View;
