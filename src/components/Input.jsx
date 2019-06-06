import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.label`
  position: relative;
  input {
    padding: var(--gutter)
      ${({ inputIcon }) => (inputIcon ? '40px' : 'var(--gutter)')} var(--gutter)
      var(--gutter);
    box-sizing: border-box;
    border: 1px solid var(--grey);
    background-color: #f1f1f1;
  }
  .inputIcon {
    position: absolute;
    right: 8px;
    top: 4px;
    svg {
      height: 24px;
      width: auto;
    }
  }
`;

const Input = ({ label, inputIcon, ...rest }) => (
  <StyledInput inputIcon={!!inputIcon}>
    {label && <span>{label}</span>}
    <input {...rest} />
    {inputIcon && <div className="inputIcon">{inputIcon}</div>}
  </StyledInput>
);

export default Input;
