import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Search } from '../assets/search.svg';

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
`;

function Loading() {
  return (
    <StyledLoading>
      <Search />
    </StyledLoading>
  );
}

export default Loading;
