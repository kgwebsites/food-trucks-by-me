import React from 'react';
import styled from 'styled-components';

const StyledChip = styled.li``;

function Chip({ children, onClose }) {
  return <StyledChip>{children}</StyledChip>;
}

export default Chip;
