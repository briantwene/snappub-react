import React from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const AccessDenied = () => {
  return (
    <>
      <h1>WOMP WOMP</h1>
      <p>Access Denied</p>
      <p>
        <strong>You must be signed in to view this page.</strong>
      </p>
      <p>
        <Link href="/">Go Home</Link>
      </p>
    </>
  );
};

export default AccessDenied;
