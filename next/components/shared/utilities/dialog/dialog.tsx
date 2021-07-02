import { Children, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import useDevice from "../../../../lib/hooks/useDevice";
import useScrollBlock from "../../../../lib/hooks/useScrollBlock";
import { HiOutlineX } from "react-icons/hi";

export interface DialogPropsType extends ReactProps {
  wrapperClass?: string;
  overlayClass?: string;
  dialogClass?: string;
  extraDialogClass?: string;
  headerClass?: string;
  extraHeaderClass?: string;
  bodyClass?: string;
  extraBodyClass?: string;
  footerClass?: string;
  extraFooterClass?: string;
  title?: string;
  icon?: JSX.Element;
  width?: string;
  maxWidth?: string;
  mobileSizeMode?: boolean;
  slideFromBottom?: "none" | "mobile-only" | "all";
  openAnimation?: string;
  closeAnimation?: string;
  root?: string;
  isOpen?: boolean;
  onClose?: () => any;
  onOverlayClick?: () => any;
}

const ROOT_ID = "dialog-root";
export function Dialog({
  wrapperClass = "fixed w-screen h-screen top-0 left-0 z-100 flex flex-col items-center overflow-y-scroll py-20",
  overlayClass = "fixed w-full h-full top-0 left-auto pointer-events-none",
  dialogClass = "relative bg-white shadow-md rounded m-auto",
  extraDialogClass = "",
  headerClass = "relative flex px-4 py-1 box-content bg-white z-5 border-top rounded-t border-b border-gray-200",
  extraHeaderClass = "",
  bodyClass = "relative p-4 bg-white rounded",
  extraBodyClass = "",
  footerClass = "relative flex px-4 pb-3 pt-2 bg-white z-5 rounded-b",
  extraFooterClass = "",
  slideFromBottom = "mobile-only",
  width = "auto",
  mobileSizeMode = false,
  maxWidth = "86vw",
  title = "",
  icon = null,
  style = {},
  onOverlayClick = () => props.onClose(),
  ...props
}: DialogPropsType) {
  const { isMobile, isSSR } = useDevice();
  if (isSSR) return null;

  const [isOpen, setIsOpen] = useState(props.isOpen);
  let isClickingOverlay = false;

  useEffect(() => {
    let timeout;
    if (props.isOpen) {
      setIsOpen(props.isOpen);
    } else {
      timeout = setTimeout(() => {
        setIsOpen(props.isOpen);
      }, 200);
    }
    return () => clearTimeout(timeout);
  }, [props.isOpen]);

  useScrollBlock({ rootId: ROOT_ID, dependencies: [isOpen] });

  let header = Children.map(props.children, (child) =>
    child?.type?.displayName === "Header" ? child : null
  );
  let body = Children.map(props.children, (child) =>
    child?.type?.displayName === "Body" ? child : null
  );
  let footer = Children.map(props.children, (child) =>
    child?.type?.displayName === "Footer" ? child : null
  );
  let children = Children.map(props.children, (child) =>
    !child?.type?.displayName ? child : null
  );

  if (title && !header.length) {
    header = [
      <>
        <div className="flex items-center flex-1" style={{ justifyContent: "inherit" }}>
          {icon ? <i className="text-lg text-primary mr-2">{icon}</i> : null}
          <span className="text-gray-700 text font-semibold">{title}</span>
        </div>
        <button className="btn-default transform translate-x-4" onClick={() => props.onClose()}>
          <i className="text-lg">
            <HiOutlineX />
          </i>
        </button>
      </>,
    ];
  }

  const inMobileMode = (slideFromBottom == "mobile-only" && isMobile) || slideFromBottom == "all";

  let el = (
    <div
      className={`dialog-wrapper ${wrapperClass} ${
        inMobileMode ? "mobile" : "not-in-mobile0-mode"
      }`}
      style={{ ...style }}
      onMouseDown={(e) => {
        e.stopPropagation();
        isClickingOverlay = true;
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        if (isClickingOverlay) {
          onOverlayClick();
          isClickingOverlay = false;
        }
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`dialog-overlay ${overlayClass} ${
          props.isOpen ? "animate-emerge" : "animate-fade"
        } ${mobileSizeMode ? "max-w-lg" : ""}`}
        style={{
          backgroundColor: "rgba(0,0,0,.32)",
        }}
      ></div>
      <div
        className={`dialog ${dialogClass} ${extraDialogClass} ${
          props.isOpen
            ? props.openAnimation
              ? props.openAnimation
              : inMobileMode
              ? "animate-slide-in-bottom"
              : "animate-scale-up"
            : props.closeAnimation
            ? props.closeAnimation
            : inMobileMode
            ? "animate-slide-out-bottom"
            : "animate-scale-down"
        }  ${mobileSizeMode ? "max-w-lg" : ""}`}
        style={{ width, maxWidth: mobileSizeMode ? undefined : maxWidth }}
        onMouseDown={(e) => {
          e.stopPropagation();
          isClickingOverlay = false;
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          isClickingOverlay = false;
        }}
      >
        {header?.length ? (
          <div className={`dialog-header ${headerClass} ${extraHeaderClass}`}>{header[0]}</div>
        ) : null}
        {body?.length ? (
          <div className={`dialog-body ${bodyClass} ${extraBodyClass}`}>{body[0]}</div>
        ) : null}
        {children}
        {footer?.length ? (
          <div className={`dialog-footer ${footerClass} ${extraFooterClass}`}>{footer[0]}</div>
        ) : null}
      </div>
    </div>
  );

  return isOpen ? createPortal(el, document.getElementById(props.root || ROOT_ID)) : null;
}

const Header = ({ children }) => children;
Header.displayName = "Header";
Dialog.Header = Header;

const Body = ({ children }) => children;
Body.displayName = "Body";
Dialog.Body = Body;

const Footer = ({ children }) => children;
Footer.displayName = "Footer";
Dialog.Footer = Footer;
