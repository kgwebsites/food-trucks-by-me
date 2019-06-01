import React, { useContext } from 'react';
import styled from 'styled-components';
import { TruckContext } from '../../contexts/TruckContext';
import FoodTruck from './FoodTruck';

const StyledFoodTrucks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function FoodTrucks() {
  const { trucks } = useContext(TruckContext);

  return (
    <StyledFoodTrucks>
      {trucks.map(truck => (
        <FoodTruck
          key={`${truck.permit}-${truck.cnn}-${truck.locationid}`}
          truck={truck}
        />
      ))}
    </StyledFoodTrucks>
  );
}

export default FoodTrucks;
