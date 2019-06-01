import React, { useContext } from 'react';
import Input from '../Input/Input';
import { TruckContext } from '../../contexts/TruckContext';

function Address({ className }) {
  const { address, setAddress } = useContext(TruckContext);
  return (
    <div className={className}>
      <Input
        label="Address"
        type="text"
        value={address}
        placeholder="353 Sacramento St"
        onChange={e => setAddress(e.target.value)}
        required
      />
    </div>
  );
}

export default React.memo(Address);
