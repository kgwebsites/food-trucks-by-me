import React from 'react';
import styled from 'styled-components';
import './App.css';
import Criteria from './components/Criteria/Criteria';
import FoodTrucks from './components/FoodTrucks/FoodTrucks';
import FoodMap from './components/FoodMap/FoodMap';
import TruckContextProvider from './contexts/TruckContext';

const StyledApp = styled.main`
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
      <h1 className="title">Food trucks by me</h1>
      <h6 className="location">(San Francisco)</h6>
      <TruckContextProvider>
        <Criteria />
        <FoodMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
            process.env.REACT_APP_GOOGLE_MAP_TOKEN
          }&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <FoodTrucks />
      </TruckContextProvider>
      <p>
        Icons made by{' '}
        <a href="https://www.freepik.com/" title="Freepik">
          Freepik
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>{' '}
        is licensed by{' '}
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC 3.0 BY
        </a>
      </p>
    </StyledApp>
  );
}

export default App;
