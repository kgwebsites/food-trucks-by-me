import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
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

function View({ location }) {
  return (
    <StyledView>
      <PoseGroup>
        <RouteContainer key={location.pathname}>
          <Switch location={location}>
            <Route
              path="/"
              exact
              component={() => (
                <FoodMap
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
                    process.env.REACT_APP_GOOGLE_MAP_TOKEN
                  }&v=3.exp&libraries=geometry,drawing,places`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              )}
            />
            <Route path="/list" component={FoodList} />
            <Route path="/filter" component={ResultFilters} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </RouteContainer>
      </PoseGroup>
    </StyledView>
  );
}

export default withRouter(View);
