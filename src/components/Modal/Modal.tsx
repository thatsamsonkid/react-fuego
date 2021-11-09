import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styled, { css } from "styled-components";
import FocusTrap from "focus-trap-react";

const centeredModal = css`
  min-height: calc(100% - 3.5rem);
`;

const ModalWrapper = styled.div<IModal>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;

  .modal-dialog {
    display: flex;
    align-items: center;
    position: relative;
    width: auto;
    max-width: 500px;
    margin: 1.75rem auto;

    ${({ position }) => position === "centered" && centeredModal}
  }

  .modal-content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    pointer-events: auto;
    background-clip: padding-box;
    outline: 0;

    background-color: ${({ theme }) =>
      theme.palette && theme.palette.primary.light};
    color: ${({ theme }) =>
      theme.palette && theme.palette.primary.contrastText};
  }

  .modal-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 1rem;

    .close {
      font-size: 3.2rem;
      cursor: pointer;
      background-color: transparent;
      border: 0;
      padding: 0.5rem 1rem 0 0;
      margin: -1rem -1rem -1rem auto;
    }
  }

  .modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
  }
`;

interface IModal {
  isShowing?: boolean;
  hide?: any;
  position?: string;
  modalHeader?: React.ReactChild;
  children?: React.ReactElement;
}

const Modal = ({
  isShowing = false,
  hide,
  modalHeader,
  children,
  position = "centered",
  ...props
}: IModal) => {
  const modalEl: any = (
    <FocusTrap>
      <ModalWrapper
        position={position}
        {...props}
        className="modal"
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {modalHeader}
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={hide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </ModalWrapper>
    </FocusTrap>
  );

  return isShowing ? createPortal(modalEl, document.body) : null;
};

export default Modal;
