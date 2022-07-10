import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { TruckContext } from '../../contexts/TruckContext';
import FoodTruck from '../FoodList/FoodTruck';
import FoodTruckIcon from '../../assets/food-truck.svg';

const StyledFoodMap = styled.div`
  margin-bottom: 24px;
  .gm-style-iw.gm-style-iw-c {
    min-height: 40px;
    min-width: 105px;
  }
  .map-container {
    height: 400px;
  }
`;

const PoseContainer = posed.div({
  enter: { staggerChildren: 50 },
});

function FoodMap() {
  const { trucks, address, geolocation, error, loaded } =
    useContext(TruckContext);

  const [openTruck, setOpenTruck] = useState('yourLocation');

  function closeTruckInfo() {
    setOpenTruck('');
  }

  if (!loaded || error || !geolocation) return null;

  return (
    <StyledFoodMap>
      <PoseContainer>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_TOKEN as string}
        >
          <GoogleMap
            zoom={15}
            mapContainerClassName="map-container"
            center={{ lat: geolocation.latitude, lng: geolocation.longitude }}
          >
            <>
              <Marker
                position={{
                  lat: geolocation.latitude,
                  lng: geolocation.longitude,
                }}
                onClick={() => setOpenTruck('yourLocation')}
              >
                {openTruck === 'yourLocation' && (
                  <InfoWindow
                    onCloseClick={closeTruckInfo}
                    position={{
                      lat: geolocation.latitude,
                      lng: geolocation.longitude,
                    }}
                  >
                    <div>Your location</div>
                  </InfoWindow>
                )}
              </Marker>
              {trucks?.map((truck) => {
                const truckId = Object.values(truck)
                  .map((val) => JSON.stringify(val))
                  .join('-');
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
                      <InfoWindow
                        onCloseClick={closeTruckInfo}
                        position={{
                          lat: parseFloat(truck.latitude),
                          lng: parseFloat(truck.longitude),
                        }}
                      >
                        <FoodTruck truck={truck} address={address} />
                      </InfoWindow>
                    )}
                  </Marker>
                );
              })}
            </>
          </GoogleMap>
        </LoadScript>
      </PoseContainer>
    </StyledFoodMap>
  );
}

export default FoodMap;
