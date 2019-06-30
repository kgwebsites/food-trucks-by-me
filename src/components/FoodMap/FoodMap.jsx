import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import { TruckContext } from '../../contexts/TruckContext';
import FoodTruck from '../FoodList/FoodTruck';
import FoodTruckIcon from '../../assets/food-truck.svg';

const StyledFoodMap = styled.div`
  margin-bottom: 24px;
  .gm-style-iw.gm-style-iw-c {
    min-height: 40px;
    min-width: 105px;
  }
`;

const PoseContainer = posed.div({
  enter: { staggerChildren: 50 },
});

function FoodMap() {
  const { trucks, geolocation, loaded, error } = useContext(TruckContext);
  const [openTruck, setOpenTruck] = useState('yourLocation');
  function closeTruckInfo() {
    setOpenTruck('');
  }
  if (!loaded || error) return null;

  return (
    <PoseContainer>
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
    </PoseContainer>
  );
}

const Injector = withScriptjs(withGoogleMap(FoodMap));

export default props => {
  return (
    <StyledFoodMap>
      <Injector {...props} />
    </StyledFoodMap>
  );
};
