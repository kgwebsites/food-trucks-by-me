import React from 'react';
import styled from 'styled-components';

const StyledFoodTruck = styled.div`
  max-width: 300px;
  .title {
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const FoodTruck = ({ truck }) => (
  <StyledFoodTruck>
    <h2 className="title">{truck.applicant}</h2>
    <small>
      {truck.location}
      <br />({truck.starttime} - {truck.endtime})
    </small>
    <p>{truck.optionaltext}</p>
  </StyledFoodTruck>
);

export default FoodTruck;
