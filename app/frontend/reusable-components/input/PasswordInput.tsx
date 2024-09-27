// PasswordInput.tsx
import React from 'react';
import zxcvbn from 'zxcvbn';
import { Input } from './Input.tsx';
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
  id: string;
  ariaLabel: string;
  onValidChange: (isValid: boolean) => void; // callback prop to control submit btn disabled state
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  autocomplete,
  minLength,
  maxLength,
  id,
  ariaLabel,
  onValidChange,
  ...attributes
}) => {
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

    const newRequirements = {
      length: password.length >= minLength && password.length <= maxLength,
      letterAndNumber: hasLetterAndNumber,
      uppercase: hasUppercase,
      specialChar: hasSpecialChar,
      strength: strength >= 2,
    };

    setPasswordRequirements(newRequirements);
    onValidChange(Object.values(newRequirements).every(Boolean));
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
        id={id}
        aria-label={ariaLabel}
        autoComplete={autocomplete}
        onChange={setPassword}
        required
        {...attributes}
      />
      <div className="mt-5 space-y-1">
        <RequirementIndicator
          met={passwordRequirements.length}
          label={
            password.length < minLength
              ? 'Password too short'
              : password.length > maxLength
              ? 'Password exceeds maximum length'
              : 'Password is sufficient length'
          }
          ariaLabel="Password length requirement"
        />
        <RequirementIndicator
          met={passwordRequirements.letterAndNumber}
          label="Contains letters and numbers"
          ariaLabel="Password letters and numbers requirement"
        />
        <RequirementIndicator
          met={passwordRequirements.uppercase}
          label="Contains uppercase letter"
          ariaLabel="Password uppercase letter requirement"
        />
        <RequirementIndicator
          met={passwordRequirements.specialChar}
          label="Contains special character"
          ariaLabel="Password special character requirement"
        />
        <RequirementIndicator
          met={passwordRequirements.strength}
          label="Strong password"
          ariaLabel="Password strength requirement"
        />
      </div>
    </div>
  );
};

export default PasswordInput;
