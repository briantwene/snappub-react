import { QueryClientProvider, QueryClient } from "react-query"
import MainLayout from "../components/mainLayout"
import "../Sass/App.scss"

const queryClient = new QueryClient();

export default function myApp({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <MainLayout >
                <Component {...pageProps} />
            </MainLayout >
        </QueryClientProvider>


    )
}