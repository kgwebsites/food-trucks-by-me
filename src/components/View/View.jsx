import React, { useContext } from 'react';
import { TruckContext } from '../../contexts/TruckContext';
import FoodMap from '../FoodMap/FoodMap';
import FoodList from '../FoodList/FoodList';

function View() {
  const { mapList } = useContext(TruckContext);
  return mapList === 'map' ? (
    <FoodMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
        process.env.REACT_APP_GOOGLE_MAP_TOKEN
      }&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  ) : (
    <FoodList />
  );
}

export default View;
