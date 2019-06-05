import React, { useContext } from 'react';
import styled from 'styled-components';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { TruckContext } from '../../contexts/TruckContext';

const StyledRange = styled.div`
  padding: var(--gutter-2) var(--gutter) 20px 12px;
  .input-range__label {
    color: #000;
    font-family: 'Open Sans', sans-serif, -apple-system, BlinkMacSystemFont,
      'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue';
  }
  .input-range__slider {
    background: var(--blue);
    border-color: var(--blue);
  }
`;

function Range({ className }) {
  const { range, setRange } = useContext(TruckContext);
  return (
    <StyledRange className={className}>
      <InputRange
        maxValue={10}
        minValue={0}
        step={0.25}
        value={range}
        name="range"
        onChange={value => setRange(value)}
        required
      />
    </StyledRange>
  );
}

export default React.memo(Range);
