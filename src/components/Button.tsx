import React from 'react';
import styled from 'styled-components';

export enum ButtonStyle {
  noStyle = 'noStyle',
  solid = 'solid',
  button = 'button',
}

interface StyledButtonProps {
  styles: ButtonStyle;
}

const StyledButton = styled.button<StyledButtonProps>`
  ${({ styles }) => {
    switch (styles) {
      case ButtonStyle.noStyle:
        return `
        border: none;
        background: transparent;
        padding: 0;
        color: black;
      `;
      case ButtonStyle.solid:
        return `
        border: 1px solid var(--blue);
        background: var(--blue);
        padding: var(--gutter);
        color: white;
      `;
      case ButtonStyle.button:
        return `
        border: 1px solid var(--blue);
        background: transparent;
        padding: var(--gutter);
        color: var(--blue);
      `;
    }
  }}
`;

interface ButtonProps {
  type: ButtonStyle;
}

function Button({
  children,
  type = ButtonStyle.button,
  ...rest
}: ButtonProps & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <StyledButton styles={type} {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
