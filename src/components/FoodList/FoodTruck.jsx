import React, { useContext } from 'react';
import styled from 'styled-components';
import { TruckContext } from '../../contexts/TruckContext';

const StyledFoodTruck = styled.div`
  width: 100%;
  padding: var(--gutter-2) 0;
  .foodTruckLocation {
    text-decoration: none;
    color: var(--blue);
    margin-top: 0;
    margin-bottom: 8px;
  }
  .title {
    margin-top: 0;
    margin-bottom: 0;
  }
  .foodTruckDescription {
    margin-bottom: 0;
  }
`;

const FoodTruck = ({ address = '', truck }) => {
  const { setSearchAddress } = useContext(TruckContext);
  return (
    <StyledFoodTruck className="FoodTruck">
      <small>
        <h3 className="foodTruckLocation">{truck.location}</h3>
      </small>
      <h3 className="title">{truck.applicant}</h3>
      <small>
        ({truck.starttime} - {truck.endtime})
      </small>
      <p className="foodTruckDescription">{truck.optionaltext}</p>
    </StyledFoodTruck>
  );
};

export default React.memo(FoodTruck);
