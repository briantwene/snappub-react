import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import MainLayout from "../components/mainLayout"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "../Sass/App.scss"

const queryClient = new QueryClient();

export default function myApp({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <MainLayout >
                <Component {...pageProps} />
            </MainLayout >
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>


    )
}