import React, { useContext } from 'react';
import styled from 'styled-components';
import { TruckContext } from '../../contexts/TruckContext';
import FoodTruck from './FoodTruck';

const StyledFoodList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function FoodList() {
  const { trucks, error } = useContext(TruckContext);

  if (error) return null;
  return (
    <StyledFoodList>
      {trucks.map(truck => (
        <FoodTruck
          key={`${truck.permit}-${truck.cnn}-${truck.locationid}`}
          truck={truck}
        />
      ))}
    </StyledFoodList>
  );
}

export default FoodList;
