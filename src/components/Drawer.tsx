import React, { useEffect, useRef } from "react";
import cx from "classnames";
import Modal from "react-modal";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

Modal.setAppElement("#__next");

const Drawer = ({
  open,
  onRequestClose,
  children,
}: {
  open: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // HACK: setTimeout needed because the content ref won't exist immediately
    // when this effect is rerun (since react-modal conditionally renders it)
    setTimeout(() => {
      if (contentRef.current) {
        if (open) {
          disableBodyScroll(contentRef.current, { reserveScrollBarGap: true });
        } else {
          enableBodyScroll(contentRef.current);
        }
      }
    });
    return () => clearAllBodyScrollLocks();
  }, [open]);

  return (
    <Modal
      contentRef={(div) => (contentRef.current = div)}
      className={{
        base: cx(
          "fixed top-0 left-0 z-50 outline-none transition-transform duration-500",
          "h-screen w-4/6 max-w-md transform shadow-lg bg-white -translate-x-full"
        ),
        afterOpen: "!translate-x-0 pointer-events-auto",
        beforeClose: "!-translate-x-full pointer-events-none",
      }}
      overlayClassName={{
        base:
          "fixed transition-colors duration-500 bg-black z-40 inset-0 bg-opacity-0",
        afterOpen: "!bg-opacity-40 pointer-events-auto",
        beforeClose: "!bg-opacity-0 pointer-events-none",
      }}
      isOpen={open}
      closeTimeoutMS={500}
      onRequestClose={onRequestClose}
      contentLabel="modal"
    >
      {children}
    </Modal>
  );
};

export default Drawer;
