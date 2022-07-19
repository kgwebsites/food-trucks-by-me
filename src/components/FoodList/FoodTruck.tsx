import React from 'react';
import styled from 'styled-components';
import { Truck } from '../../contexts/TruckContext';

const StyledFoodTruck = styled.div`
  width: 100%;
  padding: var(--gutter-2) 0;
  .foodTruckLocation {
    text-decoration: none;
    color: var(--primary);
    margin-top: 0;
    margin-bottom: 8px;
  }
  small {
    color: var(--text);
  }
  .title {
    margin-top: 0;
    margin-bottom: 0;
    color: var(--text);
  }
  .foodTruckDescription {
    margin-bottom: 0;
    color: var(--text);
  }
`;

const FoodTruck = ({ truck }: { truck: Truck }) => {
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
