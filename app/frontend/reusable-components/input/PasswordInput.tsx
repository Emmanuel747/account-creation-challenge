// PasswordInput.tsx
import React from 'react';
import zxcvbn from 'zxcvbn';
import { Input } from './input.tsx';
import RequirementIndicator from '../../reusable-components/input/RequirementIndicator.tsx';

// autocomplete docs
// https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#attr-fe-autocomplete
// https://www.chromium.org/developers/design-documents/form-styles-that-chromium-understands/

interface PasswordInputProps {
  password: string;
  minLength: number;
  maxLength: number;
  autocomplete: 'password' | 'new-password' | 'current-password';
  setPassword: (password: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ password, setPassword, autocomplete, minLength, maxLength }) => {
  const [passwordRequirements, setPasswordRequirements] = React.useState({
    length: false,
    letterAndNumber: false,
    uppercase: false,
    specialChar: false,
    strength: false,
  });

  const validatePassword = (password: string) => {
    const hasLetterAndNumber = /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const strength = zxcvbn(password).score;

    setPasswordRequirements({
      length: password.length >= minLength && password.length <= maxLength,
      letterAndNumber: hasLetterAndNumber,
      uppercase: hasUppercase,
      specialChar: hasSpecialChar,
      strength: strength >= 2,
    });
  };

  React.useEffect(() => {
    validatePassword(password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  return (
    <div>
      <Input
        label="Password"
        type="password"
        id="password"
        autoComplete={autocomplete}
        value={password}
        onChange={setPassword}
        className="w-full px-0 py-2 border-b border-gray-300 focus:border-indigo-500 focus:outline-none transition duration-150 ease-in-out bg-transparent"
        required
      />
      <div className="mt-2 space-y-1">
        <RequirementIndicator
          met={password.length <= maxLength && password.length >= minLength}
          label={
            password.length < minLength
              ? 'Password too short'
              : password.length > maxLength
              ? 'Password exceeds maximum length'
              : 'Password is sufficient length'
          }
        />
        <RequirementIndicator met={passwordRequirements.letterAndNumber} label="Contains letters and numbers" />
        <RequirementIndicator met={passwordRequirements.uppercase} label="Contains uppercase letter" />
        <RequirementIndicator met={passwordRequirements.specialChar} label="Contains special character" />
        <RequirementIndicator met={passwordRequirements.strength} label="Strong password" />
      </div>
    </div>
  );
};

export default PasswordInput;
