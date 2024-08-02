'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { Session } from 'next-auth';

interface ProviderProps {
  children: React.ReactNode;
  session: Session;
}

export const Providers: React.FC<ProviderProps> = ({ children, session }) => {
  const queryClient = new QueryClient();

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
