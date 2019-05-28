import React from 'react';

const FoodTruck = ({ truck }) => (
  <div>
    <h2>{truck.applicant}</h2>
    <p>
      Hours: {truck.starttime} - {truck.endtime}
    </p>
    <p>Address: {truck.location}</p>
    <p>{truck.optionaltext}</p>
  </div>
);

export default FoodTruck;
