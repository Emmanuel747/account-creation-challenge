import React, { useState, useEffect } from 'react';
import { FlowLayout } from '../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../reusable-components/input/Input.tsx';
import { Button } from '../../reusable-components/button/button';
import PasswordInput from '../../reusable-components/input/PasswordInput.tsx';
import { LogoSvg } from '../../../assets/logo-components/logo-components.tsx';

import './create-account.css';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isErrorState, setIsErrorState] = useState(false); // New state for error

  const validateUsername = (username: string) => {
    return username.length >= 10 && username.length <= 50;
  };

  useEffect(() => {
    setIsFormValid(validateUsername(username) && isPasswordValid);
  }, [username, password, isFormValid, isPasswordValid]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!isFormValid) {
      setError('Please ensure both username and password meet all requirements.');
      return;
    }

    try {
      const csrfTokenElement = document.querySelector('meta[name="csrf-token"]');
      const csrfToken = csrfTokenElement ? csrfTokenElement.getAttribute('content') : '';
      const response = await fetch('/api/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-Token': csrfToken }),
        },
        body: JSON.stringify({ user: { username, password } }),
      });

      if (response.ok) {
        window.location.href = '/signup/account-selection';
      } else if (response.status === 422) {
        setIsErrorState(false);
        setError('⚠ Please try another username or password');
      } else {
        const data = await response.json();
        setError(data.error || 'An error occurred while creating the account.');
      }
    } catch (err) {
      setError('An error occurred while creating the account. Please try again.');
    }
  };

  return (
    <FlowLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white px-8 py-5 rounded-2xl shadow-lg w-128 max-w-md">
          <LogoSvg />
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Account</h2>
          {/* Error element space holder to prevent UI from poping too much */}
          <div className="h-10 text-center">
            <p className={`error-msg text-red-500 text-sm ${error ? 'visible' : 'invisible'}`}>{error || ' '}</p>
          </div>
          <form
            onSubmit={handleSubmit}
            onChange={() => {
              setIsErrorState(true);
              setError('');
            }}
            className="space-y-6"
            aria-label="Create Account Form"
          >
            <Input
              label="Username"
              autoComplete="username"
              onChange={setUsername}
              id="create-account-username-input"
              required
              minLength={10}
              maxLength={50}
              aria-label="Username Input"
            />
            <PasswordInput
              id="create-account-password-input"
              ariaLabel="Create account password input"
              password={password}
              setPassword={setPassword}
              minLength={20}
              maxLength={50}
              autocomplete="current-password"
              onValidChange={setIsPasswordValid} // callback function
              aria-label="Password Input"
            />
            <Button
              className={isFormValid ? '' : 'additional-disabled-styles'}
              label="Create Account"
              type="submit"
              disabled={!isFormValid || !isErrorState}
              aria-label="Create Account Button"
            />
          </form>
        </div>
      </div>
    </FlowLayout>
  );
};

export default CreateAccount;
