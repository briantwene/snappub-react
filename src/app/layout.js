import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { auth } from '../auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Providers from '../components/Providers';

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
};

export default async function RootLayout({ children }) {
  const session = auth()
  return (
    <Providers session={session}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Providers>
  );
}
