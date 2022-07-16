import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import { Truck, TruckContext } from '../../contexts/TruckContext';
import FoodTruck from '../FoodList/FoodTruck';
import FoodTruckIcon from '../../assets/food-truck.svg';
import Loading from '../Loading';

const StyledFoodMap = styled.div`
  position: relative;
  // Food Truck InfoWindow on map
  .gm-style-iw.gm-style-iw-c {
    min-height: 40px;
    min-width: 105px !important;
    padding-top: 0;
  }
  .map-container {
    height: 400px;
  }
`;

const PoseContainer = posed.div({
  enter: { staggerChildren: 50 },
});

function getNormalizedTruckId(truck: Truck) {
  return Object.values(truck)
    .map((val) => JSON.stringify(val))
    .join('-');
}

function FoodMap() {
  const {
    trucks,
    searchAddress,
    setSearchAddress,
    geolocation,
    error,
    loaded,
  } = useContext(TruckContext);

  const truckAtSearchAddress = trucks?.find(
    (truck) => truck.location === searchAddress,
  );

  const [openTruck, setOpenTruck] = useState('');

  useEffect(() => {
    if (trucks?.length && searchAddress && truckAtSearchAddress) {
      setOpenTruck(getNormalizedTruckId(truckAtSearchAddress));
    }
  }, [trucks, searchAddress, truckAtSearchAddress, setOpenTruck]);

  function closeTruckInfo() {
    setOpenTruck('');
  }

  if (error || !geolocation) return null;

  return (
    <StyledFoodMap>
      {!loaded ? <Loading /> : null}
      <PoseContainer>
        <LoadScript
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_TOKEN as string}
        >
          <GoogleMap
            zoom={15}
            mapContainerClassName="map-container"
            center={
              truckAtSearchAddress
                ? {
                    lat: parseFloat(truckAtSearchAddress.latitude),
                    lng: parseFloat(truckAtSearchAddress.longitude),
                  }
                : { lat: geolocation.latitude, lng: geolocation.longitude }
            }
          >
            <>
              {trucks?.map((truck) => {
                const truckId = getNormalizedTruckId(truck);

                return (
                  <Marker
                    key={truckId}
                    position={{
                      lat: parseFloat(truck.latitude),
                      lng: parseFloat(truck.longitude),
                    }}
                    icon={FoodTruckIcon}
                    onClick={() => {
                      setOpenTruck(truckId);
                      setSearchAddress && setSearchAddress(truck.location);
                    }}
                  >
                    {openTruck === truckId && (
                      <InfoWindow
                        onCloseClick={closeTruckInfo}
                        position={{
                          lat: parseFloat(truck.latitude),
                          lng: parseFloat(truck.longitude),
                        }}
                      >
                        <FoodTruck truck={truck} />
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
