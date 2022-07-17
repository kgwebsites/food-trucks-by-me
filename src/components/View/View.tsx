import React from 'react';
import posed, { PoseGroup } from 'react-pose';
import styled from 'styled-components';
import FoodList from '../FoodList/FoodList';
import FoodMap from '../FoodMap/FoodMap';

const StyledView = styled.div`
  height: calc(100% - 106px);
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

const ViewContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 },
});

function View() {
  return (
    <StyledView>
      <PoseGroup>
        <ViewContainer key="routes">
          <FoodMap />
          <FoodList />
        </ViewContainer>
      </PoseGroup>
    </StyledView>
  );
}

export default View;
