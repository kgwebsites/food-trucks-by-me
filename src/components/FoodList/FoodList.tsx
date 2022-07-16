import React, { useContext } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { TruckContext } from '../../contexts/TruckContext';
import FoodTruck from './FoodTruck';

const StyledFoodList = styled.div`
  height: 100%;
  overflow: auto;
  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 var(--gutter);
    max-width: 800px;
    margin: auto;
    position: relative;
  }
  .truckContainer {
    background: none;
    border: none;
    text-align: left;
    width: 100%;
    &.active {
      border: 1px solid var(--blue);
    }
  }
  .FoodTruck {
    border-bottom: 1px solid var(--greyLight);
  }
`;

const PoseContainer = posed.div({
  enter: { staggerChildren: 50 },
});

function FoodList() {
  const { loaded, trucks, address, error, searchAddress, setSearchAddress } =
    useContext(TruckContext);

  if (error || !loaded) return null;

  return (
    <StyledFoodList>
      <PoseContainer>
        <div className="container">
          <>
            {trucks?.map((truck) => (
              <button
                className={`truckContainer ${
                  truck.location === searchAddress ? 'active' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setSearchAddress && setSearchAddress(truck.location);
                }}
                key={Object.values(truck)
                  .map((val) => JSON.stringify(val))
                  .join('-')}
              >
                <FoodTruck truck={truck} address={address} />
              </button>
            ))}
            {!trucks?.length && <h2 className="mt-0">No Food Trucks Found</h2>}
          </>
        </div>
      </PoseContainer>
    </StyledFoodList>
  );
}

export default FoodList;
