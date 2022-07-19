import React, { useContext } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { TruckContext, WeekDay } from '../../contexts/TruckContext';

const StyledDay = styled.div`
  input {
    width: 100%;
  }
`;

const days = [
  { value: 'Monday', label: 'Mon' },
  { value: 'Tuesday', label: 'Tues' },
  { value: 'Wednesday', label: 'Wed' },
  { value: 'Thursday', label: 'Thur' },
  { value: 'Friday', label: 'Fri' },
  { value: 'Saturday', label: 'Sat' },
  { value: 'Sunday', label: 'Sun' },
];

function Day({ className }: { className?: string }) {
  const { day, setDay } = useContext(TruckContext);
  return (
    <StyledDay className={className}>
      <label>
        Day
        <Select
          value={days.find((d) => d.value === day)}
          onChange={(newDay) => setDay && setDay(newDay?.value as WeekDay)}
          options={days}
        />
      </label>
    </StyledDay>
  );
}

export default React.memo(Day);
