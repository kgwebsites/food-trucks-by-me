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
  { value: 'Monday', label: 'Monday' },
  { value: 'Tuesday', label: 'Tuesday' },
  { value: 'Wednesday', label: 'Wednesday' },
  { value: 'Thursday', label: 'Thursday' },
  { value: 'Friday', label: 'Friday' },
  { value: 'Saturday', label: 'Saturday' },
  { value: 'Sunday', label: 'Sunday' },
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
