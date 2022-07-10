import React, { FormEvent, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Address from '../SearchFilters/Address';
import SearchFilters from '../SearchFilters/SearchFilters';
import { TruckContext } from '../../contexts/TruckContext';

const StyledHeader = styled.form`
  padding: var(--gutter);
  max-width: 800px;
  margin: auto;
  margin-bottom: var(--gutter-2);
  .searchRow {
    display: flex;
    align-items: center;
    margin-bottom: var(--gutter);
    .listMapLink {
      margin-right: var(--gutter);
      text-decoration: none;
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
  const { getFoodTrucks, mapOrList, toggleMapOrList } =
    useContext(TruckContext);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (getFoodTrucks) getFoodTrucks();
  }

  return (
    <StyledHeader onSubmit={onSubmit}>
      <div className="searchRow">
        <Link
          to={mapOrList === 'map' ? '/list' : '/'}
          onClick={toggleMapOrList}
          className="listMapLink"
        >
          {mapOrList === 'map' ? 'List' : 'Map'}
        </Link>
        <Address className="headerInput" />
      </div>
      <SearchFilters />
    </StyledHeader>
  );
}

export default Header;
