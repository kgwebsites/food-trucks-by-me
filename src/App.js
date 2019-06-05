import React from 'react';
import styled from 'styled-components';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import FoodTrucks from './components/FoodTrucks/FoodTrucks';
import FoodMap from './components/FoodMap/FoodMap';
import TruckContextProvider from './contexts/TruckContext';
import Error from './components/Error';

const StyledApp = styled.main`
  min-height: 100vh;
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
      <TruckContextProvider>
        <Header />
        <FoodMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
            process.env.REACT_APP_GOOGLE_MAP_TOKEN
          }&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <FoodTrucks />
        <Error />
      </TruckContextProvider>
      <Footer />
    </StyledApp>
  );
}

export default App;
