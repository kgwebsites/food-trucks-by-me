import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import timeFormat from '../../utils/timeFormat';
import { TruckContext } from '../../contexts/TruckContext';
import Button from '../Button';
import Range from './Range';
import Day from './Day';
import Time from './Time';

const StyledSearchFilters = styled.div`
  .searchFilters {
    display: flex;
    margin: calc(var(--gutter) / -2);
    .searchFilter {
      margin: calc(var(--gutter) / 2);
    }
  }
  .searchFilterActive {
    display: ${({ noFilterActive }) => (noFilterActive ? 'none' : 'block')};
    margin-top: var(--gutter-2);
  }
`;

function SearchFilters() {
  const { range, day, start24, end24 } = useContext(TruckContext);
  const [activeFilter, setActiveFilter] = useState('');

  function updateFilter(filter) {
    if (activeFilter === filter) setActiveFilter('');
    else setActiveFilter(filter);
  }

  return (
    <StyledSearchFilters noFilterActive={activeFilter === ''}>
      <div className="searchFilters">
        <Button
          className="searchFilter"
          type="button"
          onClick={() => updateFilter('range')}
        >
          Range: {range}mi
        </Button>
        <Button
          className="searchFilter"
          type="button"
          onClick={() => updateFilter('day')}
        >
          {day}
        </Button>
        <Button
          className="searchFilter"
          type="button"
          onClick={() => updateFilter('time')}
        >
          {timeFormat(start24)} - {timeFormat(end24)}
        </Button>
      </div>
      <div className="searchFilterActive">
        {activeFilter === 'range' && <Range />}
        {activeFilter === 'day' && <Day />}
        {activeFilter === 'time' && <Time />}
      </div>
    </StyledSearchFilters>
  );
}

export default SearchFilters;
