import React, { useContext } from 'react';
import styled from 'styled-components';
import Address from './Address';
import Range from './Range';
import Day from './Day';
import Start from './Start';
import End from './End';
import { TruckContext } from '../../contexts/TruckContext';

const StyledCriteria = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
  margin-bottom: 16px;
  .criteria label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
`;

function Criteria() {
  const { getFoodTrucks } = useContext(TruckContext);

  function onSubmit(e) {
    e.preventDefault();
    getFoodTrucks();
  }

  return (
    <StyledCriteria onSubmit={onSubmit}>
      <Address className="criteria" />
      <Range className="criteria" />
      <Day className="criteria" />
      <Start className="criteria" />
      <End className="criteria" />
      <button className="submitCriteria" type="submit">
        Get Food Trucks
      </button>
    </StyledCriteria>
  );
}

export default Criteria;
