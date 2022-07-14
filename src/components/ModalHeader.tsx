import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button, { ButtonStyle } from './Button';
import { ReactComponent as Close } from '../assets/close.svg';

const StyledModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gutter);
  button {
    cursor: pointer;
  }
`;

function ModalHeader({ title }: { title: string }) {
  return (
    <StyledModalHeader>
      <h2 className="mt-0 mb-0">{title}</h2>
      <Button type={ButtonStyle.noStyle} onClick={window.history.back}>
        <Close />
      </Button>
    </StyledModalHeader>
  );
}

ModalHeader.propType = {
  title: PropTypes.string,
};

ModalHeader.defaultProps = {
  title: '',
};

export default ModalHeader;
