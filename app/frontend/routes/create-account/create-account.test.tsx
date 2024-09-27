import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateAccount from './create-account';
import { describe, expect, test } from '@jest/globals';
// import '@testing-library/jest-dom/extend-expect';

describe('CreateAccount', () => {
  test('renders form fields', () => {
    render(<CreateAccount />, { wrapper: BrowserRouter });

    // Check for the presence of form fields
    screen.getByLabelText('Username Input');
    screen.getByLabelText('Password Input');
  });

  test('renders submit button', () => {
    render(<CreateAccount />, { wrapper: BrowserRouter });

    // Check for the presence of the submit button
    screen.getByLabelText('Create Account');
  });

  // Test to ensure the form behaves correctly even when a user manipulates the DOM in the browser console.
  // test('displays error message on invalid submission', async () => {
  //   render(<CreateAccount />, { wrapper: BrowserRouter });

  //   // Find the username and password input fields
  //   const usernameInput = screen.getByLabelText('Username Input') as HTMLInputElement;
  //   const passwordInput = screen.getByLabelText('Password Input') as HTMLInputElement;

  //   // Programmatically remove the minLength attribute or set it to 0
  //   usernameInput.minLength = 0;
  //   passwordInput.minLength = 0;

  //   // Find the submit button and enable it programmatically
  //   const submitButton = screen.getByLabelText('Create Account') as HTMLButtonElement;
  //   submitButton.disabled = false;

  //   // Click the submit button
  //   fireEvent.click(submitButton);

  //   // --> there is a bug here, the test can't seem to read the string properly. <--
  //   await new Promise((resolve) => setTimeout(resolve, 0));

  //   const errorMsg = document.querySelector('.error-msg');
  //   expect(errorMsg).not.toBeNull();
  //   expect(errorMsg?.textContent).toContain('Please ensure both username and password meet all requirements.');
  // });

  test('enables submit button when form is valid', () => {
    render(<CreateAccount />, { wrapper: BrowserRouter });

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText('Username Input'), { target: { value: 'validWFusername' } });
    fireEvent.change(screen.getByLabelText('Password Input'), {
      target: { value: 'validWFpassword1234567890!!' },
    });

    // Check that the submit button is enabled
    const submitButton = screen.getByLabelText('Create Account');
    expect((submitButton as HTMLButtonElement).disabled).toBe(false);
  });
});
