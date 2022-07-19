import React, { useContext } from 'react';
import styled from 'styled-components';
import { TruckContext } from '../../contexts/TruckContext';
import Radius from './Radius';
import Day from './Day';
import OpenNow from './OpenNow';

const StyledSearchFilters = styled.div<{ trucksLoaded?: number }>`
  .searchFilters {
    display: flex;
    align-items: center;
    .filtersLeft {
      display: flex;
      width: 100%;
      margin: calc(var(--gutter) / -2);
      .dayFilter {
        margin-left: calc(var(--gutter) / 2);
      }
    }
  }
`;

function SearchFilters() {
  const { trucks } = useContext(TruckContext);

  return (
    <StyledSearchFilters trucksLoaded={trucks?.length}>
      <div className="searchFilters">
        <div className="filtersLeft">
          <Radius />
          <Day className="dayFilter" />
          <OpenNow />
        </div>
      </div>
    </StyledSearchFilters>
  );
}

export default SearchFilters;
