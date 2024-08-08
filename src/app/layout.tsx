import { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { auth } from '../auth';

import { Providers } from '../components/Providers';

import '../styles/globals.scss';
export const metadata = {
  title: 'SnapPub - Home',
  description: 'Gateway to the best wallpapers from reddit',
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth();
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body id="__next">
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
