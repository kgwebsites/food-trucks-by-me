import React, { useContext } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { TruckContext } from '../../contexts/TruckContext';

function FoodMap() {
  const {
    trucks,
    geolocation: { lng, lat },
    loaded,
  } = useContext(TruckContext);

  if (!loaded) return null;

  return (
    <GoogleMap defaultZoom={15} defaultCenter={{ lat, lng }}>
      {trucks.map(truck => (
        <Marker
          key={`${truck.permit}-${truck.cnn}-${truck.locationid}`}
          position={{
            lat: parseFloat(truck.latitude),
            lng: parseFloat(truck.longitude),
          }}
        />
      ))}
    </GoogleMap>
  );
}

const Injector = withScriptjs(withGoogleMap(FoodMap));

export default props => {
  const { loaded } = useContext(TruckContext);
  if (!loaded) return null;
  return <Injector {...props} />;
};
