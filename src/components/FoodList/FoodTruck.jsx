import React from 'react';
import styled from 'styled-components';

const StyledFoodTruck = styled.div`
  width: 100%;
  .foodTruckLocation {
    text-decoration: none;
  }
  .foodTruckHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      margin-top: 0;
      margin-bottom: 0;
    }
  }
`;

const FoodTruck = ({ address = '', truck }) => (
  <StyledFoodTruck className="FoodTruck">
    <small>
      <a
        className="foodTruckLocation"
        href={`https://www.google.com/maps/dir/?api=1&origin=${address}&destination=${
          truck.latitude
        },${truck.longitude}`}
      >
        {truck.location}
      </a>
    </small>
    <div className="foodTruckHeader">
      <h3 className="title">{truck.applicant}</h3>
      <small>
        ({truck.starttime} - {truck.endtime})
      </small>
    </div>
    <p>{truck.optionaltext}</p>
  </StyledFoodTruck>
);

export default React.memo(FoodTruck);
