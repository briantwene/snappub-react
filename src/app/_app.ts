import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import MainLayout from "../components/mainLayout"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "../Sass/App.scss"
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isAppRoute = router.pathname.startsWith('/app');

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        {isAppRoute ? (
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}