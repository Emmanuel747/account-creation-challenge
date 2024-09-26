import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  type?: 'button' | 'submit';
  href?: string;
  className?: string;
  children: ReactNode;
  disabled: boolean;
}

export function Button({ href, children, type, className, disabled }: Props) {
  const classes = className || 'inline-block py-3 px-6 bg-[hsla(244,49%,49%,1)] text-white';

  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
