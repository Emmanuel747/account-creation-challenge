import React from 'react';
import { Link } from 'react-router-dom';
import { FlowLayout } from '../../reusable-components/flow-layout/flow-layout.tsx';

export function Root() {
  return (
    <FlowLayout>
      <Link to="/signup/account-selection" className="text-xl">
        Get started
      </Link>
      <Link to="/create-account" className="text-xl">
        <b> Create New Account</b>
      </Link>
    </FlowLayout>
  );
}
