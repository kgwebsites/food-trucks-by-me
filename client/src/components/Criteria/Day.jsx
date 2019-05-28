import React, { useContext } from 'react';
import Input from '../Input/Input';
import { TruckContext } from '../../contexts/TruckContext';

function Day() {
  const { day, setDay } = useContext(TruckContext);
  return (
    <div>
      <Input
        label="Day"
        type="text"
        value={day}
        placeholder="Monday"
        onChange={e => setDay(e.target.value)}
      />
    </div>
  );
}

export default React.memo(Day);
