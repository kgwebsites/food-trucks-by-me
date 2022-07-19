import styled from 'styled-components';
import Button, { ButtonStyle } from '../components/Button';
import { ReactComponent as FoodTruckIcon } from '../assets/food-truck-raw.svg';
import { ReactComponent as GoldenGateBridgeIcon } from '../assets/golden-gate-bridge.svg';

const StyledSplash = styled.main`
  padding: var(--gutter);
  .splashHeader {
    display: flex;
    align-items: center;
    border-bottom: 1px solid;
    margin-bottom: var(--gutter-2);
    svg {
      height: 48px;
      width: 48px;
    }
  }
  h1 {
    margin-left: var(--gutter-2);
  }
`;

const Splash = () => (
  <StyledSplash>
    <div className="splashHeader">
      <FoodTruckIcon />
      <h1>Food Trucks by me</h1>
    </div>
    <a href="/san-francisco">
      <Button type={ButtonStyle.button}>
        <GoldenGateBridgeIcon />
        San Francisco
      </Button>
    </a>
  </StyledSplash>
);

export default Splash;
