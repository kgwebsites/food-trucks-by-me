import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Cog } from '../assets/cog.svg';

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: row-reverse;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--gutter);
`;

function Footer() {
  return (
    <StyledFooter>
      <Link to="/settings">
        <Cog />
      </Link>
    </StyledFooter>
  );
}

export default Footer;
