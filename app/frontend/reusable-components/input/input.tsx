import React, { ChangeEvent, useState, InputHTMLAttributes } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  autoComplete?: string; // autoComplete attribute
  onChange?: (value: string) => void;
  className?: string;
}

export function Input({ onChange, label, className = '', ...props }: InputProps) {
  const [value, setValue] = useState('');
  const id = label.replace(/ /gm, '_');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange?.(event.target.value);
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        className={`w-full p-2 border-b border-gray-300 focus:border-indigo-500 focus:outline-none transition duration-150 ease-in-out bg-transparent ${className}`}
        value={value}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
}
