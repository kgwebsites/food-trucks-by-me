import React from 'react';
import './App.css';
import Criteria from './components/Criteria/Criteria';
import FoodTrucks from './components/FoodTrucks/FoodTrucks';
import FoodMap from './components/FoodMap/FoodMap';
import TruckContextProvider from './contexts/TruckContext';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
