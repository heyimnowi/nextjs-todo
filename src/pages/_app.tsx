import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { NotificationContextProvider } from '../store/notification-context'
import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<NotificationContextProvider>
			<Layout>
				<Head>
					<title>Next.js Todo App</title>
					<meta name="description" content="NextJS Todo App" />
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
				</Head>
				<Component {...pageProps} />
			</Layout>
		</NotificationContextProvider>
	)
}
