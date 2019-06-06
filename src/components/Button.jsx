import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: 1px solid var(--blue);
  background: transparent;
  padding: var(--gutter);
  color: var(--blue);
`;

function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
