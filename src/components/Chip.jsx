import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { ReactComponent as Close } from '../assets/close.svg';

const StyledChip = styled.li`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--gutter) var(--gutter-2);
  color: var(--blue);
  border-radius: var(--gutter-2);
  background: var(--blueLight);
  font-size: var(--gutter-2);
  font-weight: 400;
  line-height: var(--gutter-2);
  border: 1px solid var(--blue);
  .chipClose {
    cursor: pointer;
    margin-left: var(--gutter-2);
    svg path {
      fill: var(--greyDark) !important;
    }
  }
`;

function Chip({ children, onClose }) {
  return (
    <StyledChip>
      <div>{children}</div>
      <div>
        {onClose && (
          <Button className="chipClose" type="noStyle" onClick={onClose}>
            <Close />
          </Button>
        )}
      </div>
    </StyledChip>
  );
}

export default Chip;
