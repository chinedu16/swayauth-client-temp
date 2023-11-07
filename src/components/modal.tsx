import { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";

const Modal = (
  {
    isOpen,
    toggle,
    noShadowToggle,
    className,
    center,
    bgColor = 'bg-[rgba(0,0,0,0.2)]',
    children
  }:
    {
      isOpen: boolean,
      toggle: () => void,
      noShadowToggle?: boolean
      className?: string
      center?: boolean
      bgColor?: string
      children?: ReactNode
    }) => {

  const nonBlockToggle = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.currentTarget != e.target) || noShadowToggle) return
    toggle()
  }

  return (
    isOpen ? createPortal(
      <div onClick={nonBlockToggle} className={`fixed px-4 ${bgColor} ${className} flex ${center ? 'items-center' : 'items-start pt-10'} transition-all w-full h-full top-0 left-0 right-0 z-[100] bottom-0`}>
        <div className="max-w-2xl w-full mx-auto">
          {children}
        </div>
      </div>
      , document.body) : null
  );
};

export default Modal;
