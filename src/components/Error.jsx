import React, { useContext } from 'react';
import { TruckContext } from '../contexts/TruckContext';

function Error() {
  const { error } = useContext(TruckContext);
  if (!error) return null;
  console.error(error);
  return (
    <div>
      Error: <span dangerouslySetInnerHTML={{ __html: error }} />
    </div>
  );
}

export default Error;
