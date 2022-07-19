import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Input from '../Input';
import { TruckContext } from '../../contexts/TruckContext';
import { ReactComponent as FoodTruckIcon } from '../../assets/food-truck-raw.svg';
import { ReactComponent as LocationIcon } from '../../assets/location.svg';

const StyledAddress = styled.div`
  .submitButton,
  .useLocationButton {
    padding: 0;
    background: none;
    border: 0;
  }
`;

function Address({ className }: { className?: string }) {
  const { searchAddress, setSearchAddress, getFoodTrucks, setError } =
    useContext(TruckContext);
  return (
    <StyledAddress className={className}>
      <Input
        type="text"
        value={searchAddress}
        placeholder="415 Mission St"
        onChange={(e) =>
          setSearchAddress &&
          setSearchAddress((e.target as HTMLInputElement).value)
        }
        tabIndex={0}
        postIcon={
          <button className="submitButton" type="submit" aria-label="Search">
            <FoodTruckIcon />
          </button>
        }
        preIcon={
          <button
            className="useLocationButton"
            type="button"
            aria-label="Use Location"
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                  getFoodTrucks && getFoodTrucks(coords);
                },
                (error) => {
                  setError && setError(error.message);
                },
              );
            }}
          >
            <LocationIcon />
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
