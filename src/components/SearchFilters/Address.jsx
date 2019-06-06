import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input from '../Input';
import { TruckContext } from '../../contexts/TruckContext';
import { ReactComponent as FoodTruckIcon } from '../../assets/food-truck-raw.svg';

const StyledAddress = styled.div`
  .submitButton {
    padding: 0;
    background: none;
    border: 0;
  }
`;

function Address({ className }) {
  const { address, setAddress } = useContext(TruckContext);
  return (
    <StyledAddress className={className}>
      <Input
        type="text"
        value={address}
        placeholder="353 Sacramento St"
        onChange={e => setAddress(e.target.value)}
        inputIcon={
          <button className="submitButton" type="submit">
            <FoodTruckIcon />
          </button>
        }
        required
      />
    </StyledAddress>
  );
}

Address.propTypes = {
  className: PropTypes.string,
};

Address.defaultProps = {
  className: '',
};

export default React.memo(Address);
