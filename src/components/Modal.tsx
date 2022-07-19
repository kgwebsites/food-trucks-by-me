import React, { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledModal = styled.dialog`
  z-index: 100;
  height: 100%;
  width: 100%;
  padding: 8px;
  background-color: var(--background);
  color: var(--text);
  max-height: 100%;
  box-sizing: border-box;
  max-width: 100%;
  border: 0;
`;

interface ModalProps {
  children: ReactNode;
}

const Modal = (
  { children }: ModalProps,
  ref: React.ForwardedRef<HTMLDialogElement>,
) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const currentContainer = containerRef?.current;
    window.addEventListener(
      'ModalClose' as keyof WindowEventMap,
      // @ts-ignore
      () => currentContainer?.querySelector('dialog')?.close(),
    );
    return () => {
      window.removeEventListener(
        'ModalClose' as keyof WindowEventMap,
        // @ts-ignore
        () => currentContainer?.querySelector('dialog')?.close(),
      );
    };
  }, []);
  return (
    <div ref={containerRef}>
      <StyledModal ref={ref}>{children}</StyledModal>
    </div>
  );
};

export default React.forwardRef(Modal);
