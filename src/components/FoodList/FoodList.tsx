import React, { useContext } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { TruckContext } from '../../contexts/TruckContext';
import FoodTruck from './FoodTruck';

const StyledFoodList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 var(--gutter);
  max-width: 800px;
  margin: auto;
  position: relative;
  .FoodTruck {
    border-bottom: 1px solid var(--greyLight);
    margin-bottom: var(--gutter-2);
  }
`;

const PoseContainer = posed.div({
  enter: { staggerChildren: 50 },
});

function FoodList() {
  const { trucks, address, error } = useContext(TruckContext);

  if (error) return null;

  return (
    <PoseContainer>
      <StyledFoodList>
        <>
          {trucks?.map((truck) => (
            <FoodTruck
              key={Object.values(truck)
                .map((val) => JSON.stringify(val))
                .join('-')}
              truck={truck}
              address={address}
            />
          ))}
          {!trucks?.length && <h2 className="mt-0">No Food Trucks Found</h2>}
        </>
      </StyledFoodList>
    </PoseContainer>
  );
}

export default FoodList;
