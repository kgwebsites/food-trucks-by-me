import React, { useRef } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import Address from '../SearchFilters/Address';
import SearchFilters from '../SearchFilters/SearchFilters';
import Button, { ButtonStyle } from '../Button';
import FoodList from '../FoodList/FoodList';

const StyledHeader = styled.form`
  padding: var(--gutter);
  max-width: 800px;
  margin: auto;
  margin-bottom: var(--gutter-2);
  Button {
    width: 44px;
  }
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
  const listModal = useRef<HTMLDialogElement>(null);

  return (
    <StyledHeader
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="searchRow">
        <Button
          className="listMapLink"
          type={ButtonStyle.button}
          onClick={() => {
            // @ts-ignore
            listModal.current?.showModal();
          }}
        >
          List
        </Button>
        <Address className="headerInput" />
      </div>
      <SearchFilters />
      <Modal ref={listModal}>
        <div className="searchRow">
          <Button
            className="listMapLink"
            onClick={() => {
              // @ts-ignore
              listModal.current?.close();
            }}
            type={ButtonStyle.button}
          >
            Map
          </Button>
          <Address className="headerInput" />
        </div>
        <FoodList />
      </Modal>
    </StyledHeader>
  );
}

export default Header;
