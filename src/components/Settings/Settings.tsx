import React from 'react';
import posed from 'react-pose';
import styled from 'styled-components';

const StyledSettings = styled.div`
  max-width: 800px;
  margin: auto;
`;

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
      <StyledSettings>
        <div>
          Icons made by:
          <ul>
            <li>
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
            </li>
            <li>
              <a
                href="https://www.flaticon.com/authors/fermam-aziz"
                title="Fermam Aziz"
                rel="noopener noreferrer"
              >
                Fermam Aziz
              </a>{' '}
              from{' '}
              <a
                href="https://www.flaticon.com/"
                title="Flaticon"
                rel="noopener noreferrer"
              >
                www.flaticon.com
              </a>{' '}
              is licensed by{' '}
              <a
                href="http://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC 3.0 BY
              </a>
            </li>
            <li>
              <a href="svgrepo.com">svgrepo.com</a>
            </li>
          </ul>
        </div>
      </StyledSettings>
    </PoseContainer>
  );
}

export default Settings;
