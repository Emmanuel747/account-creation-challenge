import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  type?: 'button' | 'submit';
  href?: string;
  className?: string;
  children?: ReactNode;
  disabled: boolean;
  label: string;
}

export function Button({ href, children, type = 'button', className = '', disabled, label }: Props) {
  const baseClasses =
    'w-full py-3 px-4 rounded-md transition duration-150 ease-in-out transform hover:-translate-y-0.5';
  const enabledClasses =
    'text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2';
  const disabledClasses = 'bg-gray-300 text-gray-500 cursor-not-allowed';

  const classes = `${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${className}`;

  const style = !disabled ? { backgroundColor: 'rgb(69, 69, 180)' } : {};

  if (href) {
    return (
      <Link to={href} className={classes} style={style}>
        {label}
        {children}
      </Link>
    );
  }

  return (
    <button aria-label={label} type={type} className={classes} disabled={disabled} style={style}>
      {label}
      {children}
    </button>
  );
}
