import React, { useState, useEffect } from 'react';
import { FlowLayout } from '../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../reusable-components/input/input';
import { Button } from '../../reusable-components/button/button';
import PasswordInput from 'app/frontend/reusable-components/input/PasswordInput.tsx';
import { LogoSvg } from '../../../assets/logo-components/logo-components.tsx';

import './create-account.css';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const validateUsername = (username: string) => {
    return username.length >= 10 && username.length <= 50;
  };

  useEffect(() => {
    setIsFormValid(validateUsername(username) && password.length >= 20);
  }, [username, password]);

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
        // window.location.href = '/signup/account-selection';
      } else {
        const data = await response.json();
        setError(data.error || 'An error occurred while creating the account.');
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred while creating the account. Please try again.');
    }
  };

  return (
    <FlowLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 max-w-md">
          <LogoSvg className="flex justify-center mb-6" />
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Account</h2>
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              autoComplete="username"
              onChange={setUsername}
              className="input"
              required
              minLength={10}
              maxLength={50}
            />
            <PasswordInput
              password={password}
              setPassword={setPassword}
              minLength={20}
              maxLength={50}
              autocomplete="current-password"
            />
            <Button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 px-4 rounded-md transition duration-150 ease-in-out transform hover:-translate-y-0.5 ${
                isFormValid
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </FlowLayout>
  );
};

export default CreateAccount;
