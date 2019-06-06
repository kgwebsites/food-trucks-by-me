import React, { useContext } from 'react';
import styled from 'styled-components';
import Address from '../SearchFilters/Address';
import SearchFilters from '../SearchFilters/SearchFilters';
import { TruckContext } from '../../contexts/TruckContext';

const StyledHeader = styled.form`
  padding: var(--gutter);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  margin-bottom: var(--gutter-2);
  .searchRow {
    display: flex;
    align-items: center;
    margin-bottom: var(--gutter);
    .listMapLink {
      margin-right: var(--gutter);
    }
    .headerInput {
      flex-grow: 1;
      label {
        display: block;
        input {
          width: 100%;
        }
      }
    }
  }
`;

function Header() {
  const { getFoodTrucks, toggleMapList, mapList } = useContext(TruckContext);

  function onSubmit(e) {
    e.preventDefault();
    getFoodTrucks();
  }

  return (
    <StyledHeader onSubmit={onSubmit}>
      <div className="searchRow">
        <button
          type="button"
          className="link listMapLink"
          onClick={toggleMapList}
        >
          {mapList === 'map' ? 'List' : 'Map'}
        </button>
        <Address className="headerInput" />
      </div>
      <SearchFilters />
    </StyledHeader>
  );
}

export default Header;
