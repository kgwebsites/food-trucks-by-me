import React, { useContext } from 'react';
import { TruckContext } from '../../contexts/TruckContext';
import FoodTruck from './FoodTruck';

function FoodTrucks() {
  const { trucks } = useContext(TruckContext);

  return (
    <div>
      {trucks.map(truck => (
        <FoodTruck
          key={`${truck.permit}-${truck.cnn}-${truck.locationid}`}
          truck={truck}
        />
      ))}
    </div>
  );
}

export default FoodTrucks;
