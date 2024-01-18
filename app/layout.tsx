// Types
import type { Metadata } from 'next'

// Styles
import { Inter } from 'next/font/google'
import './globals.css'

// Theming
import { Providers } from '@/app/providers'

// Components
import Navbar from '@/components/Navbar'
import SessionProvider from '@/components/session-provider'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'My Thoughts, My Journey | ScribeQuantum',
	description: 'Created, designed, and deployed by Mohammad Ali',
}

interface Props {
	children: React.ReactNode
}

const RootLayout: React.FC<Props> = ({ children }) => {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<link rel='icon' href='/ScribeQuantum.ico' type='image/x-icon' />
			</head>
			<body className={inter.className}>
				<Providers>
					<main className='max-w-7xl mx-auto p-10 space-y-5'>
						<Navbar />
						{children}
						<Analytics />
						<SpeedInsights />
					</main>
					<Toaster />
				</Providers>
				{/* @ts-ignore */}
				<SessionProvider />
			</body>
		</html>
	)
}

export default RootLayout
