import React, { useContext } from 'react';
import Input from '../Input/Input';
import { TruckContext } from '../../contexts/TruckContext';

function Range({ className }) {
  const { range, setRange } = useContext(TruckContext);
  return (
    <div className={className}>
      <Input
        label="Range (in miles)"
        type="number"
        value={range}
        placeholder=".25"
        onChange={e => setRange(e.target.value)}
        required
      />
    </div>
  );
}

export default React.memo(Range);
