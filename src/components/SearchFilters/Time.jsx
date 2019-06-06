import React, { useContext } from 'react';
import styled from 'styled-components';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { TruckContext } from '../../contexts/TruckContext';

const StyledTime = styled.div`
  display: flex;
  justify-content: center;
  .react-timerange-picker__wrapper {
    border: 0;
    .react-timerange-picker__inputGroup {
      position: relative;
      &:last-child {
        margin-left: var(--gutter-2);
      }
      &:after {
        content: ' ';
        display: block;
        height: 26px;
        border-bottom: 2px solid white;
        width: 18px;
        position: absolute;
        right: 0;
        z-index: 1;
      }
      .react-timerange-picker__inputGroup__input {
        border-bottom: 1px solid var(--grey);
        border-radius: 0;
        &:focus {
          outline: none;
          border-color: var(--blue);
        }
      }
    }
  }
`;

function Time({ className }) {
  const { start24, setStart24, end24, setEnd24 } = useContext(TruckContext);

  function onChange([start, end]) {
    if (start !== start24) {
      setStart24(start);
    }
    if (end !== end24) {
      setEnd24(end);
    }
  }

  return (
    <StyledTime className={className}>
      <TimeRangePicker
        onChange={onChange}
        value={[start24, end24]}
        format="HH:m a"
        clearIcon={null}
        clockIcon={null}
        disableClock
        required
      />
    </StyledTime>
  );
}

export default Time;
