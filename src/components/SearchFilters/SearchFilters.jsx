import React, { useContext } from 'react';
import styled from 'styled-components';
import { TruckContext } from '../../contexts/TruckContext';
import Chip from '../Chip';
import Radius from './Radius';
import Day from './Day';
import OpenNow from './OpenNow';

const StyledSearchFilters = styled.div`
  .searchFilters {
    display: flex;
    align-items: center;
    .filtersLeft {
      display: flex;
      width: 100%;
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
`;

function SearchFilters() {
  const { trucks, resultFilters, setResultFilters } = useContext(TruckContext);

  function removeResultFilter(oldFilterType) {
    const newResultFilters = {};
    Object.entries(resultFilters).forEach(([filterType, filter]) => {
      if (filterType !== oldFilterType) {
        newResultFilters[filterType] = filter;
      }
    });
    setResultFilters(newResultFilters);
  }

  return (
    <StyledSearchFilters trucksLoaded={trucks?.length}>
      <div className="searchFilters">
        <div className="filtersLeft">
          <Radius />
          <Day />
          <OpenNow />
        </div>
      </div>
      {Object.keys(resultFilters).length ? (
        <div className="resultFiltersActive">
          {Object.entries(resultFilters).map(([filterType, filter]) => (
            <Chip
              key={filterType}
              onClose={() => removeResultFilter(filterType)}
            >
              {filter}
            </Chip>
          ))}
        </div>
      ) : (
        ''
      )}
    </StyledSearchFilters>
  );
}

export default SearchFilters;
