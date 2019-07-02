import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: ${({ type }) =>
    type === 'noStyle' ? 'none' : '1px solid var(--blue)'};
  background: transparent;
  padding: ${({ type }) => (type === 'noStyle' ? '0' : 'var(--gutter)')};
  color: ${({ type }) => type !== 'noStyle' && 'var(--blue)'};
`;

function Button({ children, type, ...rest }) {
  return (
    <StyledButton type={type} {...rest}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
