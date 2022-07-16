import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';
import FoodMap from '../FoodMap/FoodMap';

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
  return (
    <StyledView>
      <PoseGroup>
        <RouteContainer key="routes">
          <FoodMap />
        </RouteContainer>
      </PoseGroup>
    </StyledView>
  );
}

export default View;
