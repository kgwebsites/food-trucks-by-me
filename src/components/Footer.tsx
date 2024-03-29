import React, { useRef } from 'react';
import styled from 'styled-components';
import Button, { ButtonStyle } from './Button';
import Settings from './Settings/Settings';
import Modal from './Modal';
import { ReactComponent as Cog } from '../assets/cog.svg';
import { ReactComponent as Close } from '../assets/close.svg';

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: row-reverse;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--gutter);
  svg {
    color: var(--text);
  }
  .flexRight {
    display: flex;
    justify-content: flex-end;
  }
`;

function Footer() {
  const settingsModal = useRef(null);
  return (
    <StyledFooter>
      <Button
        type={ButtonStyle.noStyle}
        // @ts-ignore
        onClick={() => settingsModal.current?.showModal()}
        aria-label="Settings"
      >
        <Cog />
      </Button>
      <Modal ref={settingsModal}>
        <div className="flexRight">
          <Button
            type={ButtonStyle.noStyle}
            // @ts-ignore
            onClick={() => settingsModal.current?.close()}
            aria-label="Close Settings"
          >
            <Close />
          </Button>
        </div>
        <Settings />
      </Modal>
    </StyledFooter>
  );
}

export default Footer;
