import React, { useContext } from 'react';
import Address from './Address';
import Range from './Range';
import Day from './Day';
import Start from './Start';
import End from './End';
import { TruckContext } from '../../contexts/TruckContext';

function Criteria() {
  const { getFoodTrucks } = useContext(TruckContext);

  function onSubmit(e) {
    e.preventDefault();
    getFoodTrucks();
  }

  return (
    <form onSubmit={onSubmit}>
      <Address />
      <Range />
      <Day />
      <Start />
      <End />
      <button type="submit">Get Food Trucks</button>
    </form>
  );
}

export default Criteria;
