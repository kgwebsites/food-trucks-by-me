import React, { useContext } from 'react';
import { TruckContext } from '../contexts/TruckContext';

function Error() {
  const { error } = useContext(TruckContext);
  return <div>Error: {error}</div>;
}

export default Error;
