import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { auth } from '../auth';

import Providers from '../components/Providers';

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

export default async function RootLayout({ children }) {
  const session = auth();
  return (
    <html lang="en">
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
