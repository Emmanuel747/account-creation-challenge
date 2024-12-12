import React from 'react';

interface LogoComponentProps {
  className?: string;
}

export const LogoSvg: React.FC<LogoComponentProps> = ({ className }) => {
  return (
    <div className={className ?? 'wealthfront-logo flex justify-center mb-6 mt-3'}>
      <img
        data-testid="wflogo"
        src="https://www.wealthfront.com/blog/wp-content/themes/wealthfront-chisel/dist/assets/images/wealthfront-logo.svg"
        alt="Wealthfront Logo"
        style={{ transform: 'scale(2)' }}
      />
    </div>
  );
};

export const LogoAndName: React.FC<LogoComponentProps> = ({ className }) => {
  return (
    <div className={className ?? 'flex justify-center mb-6 mt-3'}>
      <img
        data-testid="wflogo"
        src="https://cdn.wealthfront.com/vite/assets/wealthfront_wordmark-ec31fffe.svg"
        alt="Wealthfront Logo with text"
        style={{ transform: 'scale(2)' }}
      />
    </div>
  );
};
