import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button';
import { ReactComponent as Close } from '../assets/close.svg';

const StyledModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--gutter);
`;

function ModalHeader({ title, history }) {
  return (
    <StyledModalHeader>
      <h2 className="mt-0 mb-0">{title}</h2>
      <Button type="noStyle" onClick={history.goBack}>
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

export default withRouter(ModalHeader);
