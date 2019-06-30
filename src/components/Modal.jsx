import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ModalHeader from './ModalHeader';

const StyledModal = styled.div`
  padding: 0 var(--gutter);
`;

function Modal({ children, title }) {
  return (
    <StyledModal>
      <ModalHeader title={title} />
      {children}
    </StyledModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

Modal.defaultProps = {
  title: '',
};

export default Modal;
