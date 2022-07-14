import React, { useContext } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { TruckContext } from '../../contexts/TruckContext';

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

function Day({ className }) {
  const { day, setDay } = useContext(TruckContext);
  return (
    <StyledDay className={className}>
      <label>
        Day
        <Select
          value={days.find((d) => d.value === day)}
          onChange={(newDay) => setDay(newDay.value)}
          options={days}
        />
      </label>
    </StyledDay>
  );
}

export default React.memo(Day);
