import React from 'react';
import styled from 'styled-components';
import Address from '../SearchFilters/Address';
import SearchFilters from '../SearchFilters/SearchFilters';

const StyledHeader = styled.form`
  padding: var(--gutter);
  width: 100%;
  max-width: 800px;
  margin: auto;
  margin-bottom: var(--gutter-2);
  box-sizing: border-box;
  .searchRow {
    display: flex;
    align-items: center;
    margin-bottom: var(--gutter);
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
  return (
    <StyledHeader
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="searchRow">
        <Address className="headerInput" />
      </div>
      <SearchFilters />
    </StyledHeader>
  );
}

export default Header;
