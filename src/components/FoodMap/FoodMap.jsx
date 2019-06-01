import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import { TruckContext } from '../../contexts/TruckContext';
import FoodTruck from '../FoodTrucks/FoodTruck';
import FoodTruckIcon from '../../assets/food-truck.svg';

const StyledFoodMap = styled.div`
  margin-bottom: 24px;
`;

function FoodMap() {
  const { trucks, geolocation, loaded, error } = useContext(TruckContext);
  const [openTruck, setOpenTruck] = useState('yourLocation');
  function closeTruckInfo() {
    setOpenTruck('');
  }
  if (!loaded || error) return null;

  return (
    <div>
      <GoogleMap defaultZoom={16} defaultCenter={geolocation}>
        <>
          <Marker
            position={geolocation}
            onClick={() => setOpenTruck('yourLocation')}
          >
            {openTruck === 'yourLocation' && (
              <InfoWindow onCloseClick={closeTruckInfo}>
                <div>Your location</div>
              </InfoWindow>
            )}
          </Marker>
          {trucks.map(truck => {
            const truckId = `${truck.permit}-${truck.cnn}-${truck.locationid}`;
            function openTruckInfo() {
              setOpenTruck(truckId);
            }
            return (
              <Marker
                key={truckId}
                position={{
                  lat: parseFloat(truck.latitude),
                  lng: parseFloat(truck.longitude),
                }}
                icon={FoodTruckIcon}
                onClick={openTruckInfo}
              >
                {openTruck === truckId && (
                  <InfoWindow onCloseClick={closeTruckInfo}>
                    <FoodTruck truck={truck} />
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
        </>
      </GoogleMap>
    </div>
  );
}

const Injector = withScriptjs(withGoogleMap(FoodMap));

export default props => {
  const { loaded } = useContext(TruckContext);
  if (!loaded) return null;
  return (
    <StyledFoodMap>
      <Injector {...props} />
    </StyledFoodMap>
  );
};
