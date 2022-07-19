import React, { useContext } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { TruckContext } from '../../contexts/TruckContext';

interface Option {
  value: number;
  label: string;
}

const options: Option[] = [
  { value: 0.25, label: '0.25 Miles' },
  { value: 0.5, label: '0.5 Miles' },
  { value: 1, label: '1 Mile' },
  { value: 2, label: '2 Miles' },
  { value: 3, label: '3 Miles' },
];

const StyledRadius = styled.div`
  .css-26l3qy-menu,
  .css-1s2u09g-control,
  .css-1pahdxg-control {
    background-color: var(--background);
    color: var(--text);
  }
  .css-qc6sy-singleValue {
    color: var(--text);
  }
`;

interface RadiusProps {
  className?: string;
}

function Radius({ className }: RadiusProps) {
  const { range, setRange } = useContext(TruckContext);
  return (
    <StyledRadius className={className}>
      <label>
        Radius
        <Select
          value={options.find((r) => r.value === range)}
          onChange={(newRadius: Option | null) =>
            setRange && newRadius?.value && setRange(newRadius?.value)
          }
          options={options}
        />
      </label>
    </StyledRadius>
  );
}

export default React.memo(Radius);
