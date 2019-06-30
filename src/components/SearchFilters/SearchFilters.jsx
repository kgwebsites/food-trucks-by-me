import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import timeFormat from '../../utils/timeFormat';
import { TruckContext } from '../../contexts/TruckContext';
import Button from '../Button';
import Range from './Range';
import Day from './Day';
import Time from './Time';
import { ReactComponent as Funnel } from '../../assets/funnel.svg';

const StyledSearchFilters = styled.div`
  .searchFilters {
    display: flex;
    align-items: center;
    .filtersLeft {
      display: flex;
      margin: calc(var(--gutter) / -2);
      .searchFilter {
        margin: calc(var(--gutter) / 2);
      }
    }
    .filtersRight {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
      .funnel {
        filter: ${({ trucksLoaded }) =>
          trucksLoaded ? 'none' : 'opacity(0.25);'};
        cursor: ${({ trucksLoaded }) =>
          trucksLoaded ? 'pointer' : 'nw-resize'};
      }
    }
  }
  .searchFilterActive {
    display: ${({ noFilterActive }) => (noFilterActive ? 'none' : 'block')};
    margin-top: var(--gutter-2);
  }
`;

function SearchFilters() {
  const { range, day, start24, end24, trucks } = useContext(TruckContext);
  const [activeFilter, setActiveFilter] = useState('');

  function updateFilter(filter) {
    if (activeFilter === filter) setActiveFilter('');
    else setActiveFilter(filter);
  }

  return (
    <StyledSearchFilters
      noFilterActive={activeFilter === ''}
      trucksLoaded={trucks.length}
    >
      <div className="searchFilters">
        <div className="filtersLeft">
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

        <div className="filtersRight">
          <Link className="funnel" to={trucks.length ? '/filter' : ''}>
            <Funnel />
          </Link>
        </div>
      </div>
      <div className="resultFiltersActive" />
      <div className="searchFilterActive">
        {activeFilter === 'range' && <Range />}
        {activeFilter === 'day' && <Day />}
        {activeFilter === 'time' && <Time />}
      </div>
    </StyledSearchFilters>
  );
}

export default SearchFilters;
