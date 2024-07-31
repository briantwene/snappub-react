import React from 'react';
import { signIn } from 'next-auth/react';

const AccessDenied = () => {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <a
          href="/api/auth/login"
          onClick={(e) => {
            e.preventDefault();
            signIn('reddit');
          }}
        >
          You must be signed in to view this page
        </a>
      </p>
    </>
  );
};

export default AccessDenied;
