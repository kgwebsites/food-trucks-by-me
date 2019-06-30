import React from 'react';
import posed from 'react-pose';
import Modal from '../Modal';

const PoseContainer = posed.div({
  enter: { y: 0, opacity: 1 },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 200 },
    staggerChildren: 50,
  },
});

function Settings() {
  return (
    <PoseContainer>
      <Modal title="Settings">
        <div>
          Icons made by{' '}
          <a
            href="https://www.freepik.com/"
            rel="noopener noreferrer"
            title="Freepik"
          >
            Freepik
          </a>{' '}
          from{' '}
          <a
            href="https://www.flaticon.com/"
            rel="noopener noreferrer"
            title="Flaticon"
          >
            www.flaticon.com
          </a>{' '}
          is licensed by{' '}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            rel="noopener noreferrer"
            title="Creative Commons BY 3.0"
            target="_blank"
          >
            CC 3.0 BY
          </a>
        </div>
      </Modal>
    </PoseContainer>
  );
}

export default Settings;
