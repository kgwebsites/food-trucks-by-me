import React, { useContext } from 'react';
import Input from '../Input/Input';
import { TruckContext } from '../../contexts/TruckContext';

function Start({ className }) {
  const { start24, setStart24 } = useContext(TruckContext);
  return (
    <div className={className}>
      <Input
        label="Open after"
        type="text"
        value={start24}
        placeholder="12:00"
        onChange={e => setStart24(e.target.value)}
      />
    </div>
  );
}

export default React.memo(Start);
