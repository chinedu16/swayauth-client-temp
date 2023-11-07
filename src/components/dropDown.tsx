import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ComponentProps, ReactElement, useEffect, useState } from "react";

const Container = ({ children }: { children?: ReactElement[] }) => {
  const [show, setShow] = useState('hidden');
  const toggle = (e: any) => { e.stopPropagation(); setShow(p => p === 'hidden' ? '' : 'hidden'); }
  useEffect(() => {
    window.addEventListener('click', (e) => { e.stopPropagation(); setShow('hidden') })
    return () => {
      window.removeEventListener('click', () => null)
    }
  }, []);

  return <div className="relative inline-block">
    {
      children ? React.Children.map(children, (child) => {
        return React.cloneElement(child, { toggle, show })
      }) : null
    }
  </div>;
};

export const Toggle = ({ toggle, hideCaret = false, show, ...rest }: { toggle?: () => void, hideCaret?: boolean, show?: string } & ComponentProps<'button'>) => {
  return (
    <div onClick={toggle} className="inline-flex items-end select-none">
      <button {...rest} type="button" />
      {
        hideCaret ? null :
          <FontAwesomeIcon icon={faChevronDown} className={`${show ? 'opacity-40' : ''} text-sm ml-1 pb-1`} />
      }
    </div>
  )
}

export const Body = ({ show, ...rest }: { toggle?: () => void, show?: boolean } & ComponentProps<'div'>) => {
  const { className, ...restSpread } = rest
  return (
    <div className={`z-50 ${show} absolute ${className}`} {...restSpread} />
  )
}

export default {
  Container,
  Body,
  Toggle
}