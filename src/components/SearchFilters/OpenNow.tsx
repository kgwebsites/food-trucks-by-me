import React, { useContext } from 'react';
import styled from 'styled-components';
import { TruckContext } from '../../contexts/TruckContext';

const StyledOpenNow = styled.div`
  input {
    width: 28px;
    height: 28px;
  }
`;

function OpenNow() {
  const { openNow, setOpenNow } = useContext(TruckContext);
  return (
    <StyledOpenNow>
      <label>
        Open <br />
        <input
          type="checkbox"
          className="searchFilter"
          onChange={() => setOpenNow && setOpenNow(!openNow)}
          checked={openNow}
        />
      </label>
    </StyledOpenNow>
  );
}

export default OpenNow;
