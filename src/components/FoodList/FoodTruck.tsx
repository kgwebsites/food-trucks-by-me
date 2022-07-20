import React, { useContext } from 'react';
import styled from 'styled-components';
import { Truck, TruckContext } from '../../contexts/TruckContext';
import { ReactComponent as AppleMapsIcon } from '../../assets/apple-maps.svg';
import { ReactComponent as GoogleMapsIcon } from '../../assets/google-maps.svg';

const StyledFoodTruck = styled.div`
  width: 100%;
  padding: var(--gutter-2) 0;
  .foodTruckLocation {
    text-decoration: none;
    color: var(--primary);
    margin-top: 0;
    margin-bottom: 8px;
  }
  small {
    color: var(--text);
  }
  .title {
    margin-top: 0;
    margin-bottom: 0;
    color: var(--text);
  }
  .foodTruckDescription {
    margin-bottom: var(--gutter);
    color: var(--text);
  }
  .appleMaps {
    svg {
      width: 48px;
      height: 48px;
    }
    @supports not (-webkit-touch-callout: none) {
      /* CSS for other than iOS devices */
      display: none;
    }
  }
  .googleMaps {
    svg {
      width: 48px;
      height: 48px;
    }
  }
`;

const FoodTruck = ({ truck }: { truck: Truck }) => {
  const { city } = useContext(TruckContext);

  return (
    <StyledFoodTruck className="FoodTruck">
      <small>
        <h3 className="foodTruckLocation">{truck.location}</h3>
      </small>
      <h3 className="title">{truck.applicant}</h3>
      <small>
        ({truck.starttime} - {truck.endtime})
      </small>
      <p className="foodTruckDescription">{truck.optionaltext}</p>
      <a
        className="appleMaps"
        href={`http://maps.apple.com/daddr=${truck.location}+${city}`}
      >
        <AppleMapsIcon />
      </a>
      <a
        className="googleMaps"
        href={`https://www.google.com/maps/dir/?api=1&destination=${truck.location}+${city}`}
      >
        <GoogleMapsIcon />
      </a>
    </StyledFoodTruck>
  );
};

export default React.memo(FoodTruck);
