import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.label`
  input {
    padding: var(--gutter);
    box-sizing: border-box;
    border: 1px solid var(--grey);
    background-color: #f1f1f1;
  }
`;

const Input = ({ label, ...rest }) => (
  <StyledInput>
    {label && <span>{label}</span>}
    <input {...rest} />
  </StyledInput>
);

export default Input;
