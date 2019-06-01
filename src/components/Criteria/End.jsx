import React, { useContext } from 'react';
import Input from '../Input/Input';
import { TruckContext } from '../../contexts/TruckContext';

function End({ className }) {
  const { end24, setEnd24 } = useContext(TruckContext);
  return (
    <div className={className}>
      <Input
        label="Close after"
        type="text"
        value={end24}
        placeholder="13:00"
        onChange={e => setEnd24(e.target.value)}
      />
    </div>
  );
}

export default React.memo(End);
