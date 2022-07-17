import React, { InputHTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

const StyledInput = styled.label<IconProps>`
  position: relative;
  input {
    padding: var(--gutter)
      ${({ postIcon }) => (postIcon ? '40px' : 'var(--gutter)')} var(--gutter)
      ${({ preIcon }) => (preIcon ? '40px' : 'var(--gutter)')};
    box-sizing: border-box;
    border: 1px solid var(--grey);
    background-color: #f1f1f1;
  }
  .preIcon {
    position: absolute;
    left: 8px;
    top: 4px;
    svg {
      height: 24px;
      width: auto;
    }
  }
  .postIcon {
    position: absolute;
    right: 8px;
    top: 4px;
    svg {
      height: 24px;
      width: auto;
    }
  }
`;

interface IconProps {
  preIcon?: ReactNode;
  postIcon?: ReactNode;
}

const Input = ({
  preIcon,
  postIcon,
  ...rest
}: IconProps & InputHTMLAttributes<HTMLInputElement>) => (
  <StyledInput postIcon={!!postIcon} preIcon={!!preIcon}>
    <>
      {preIcon && <div className="preIcon">{preIcon}</div>}
      <input {...rest} />
      {postIcon && <div className="postIcon">{postIcon}</div>}
    </>
  </StyledInput>
);

export default Input;
