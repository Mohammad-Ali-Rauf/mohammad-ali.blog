import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/app/providers'
import Navbar from '@/components/Navbar'
import SessionProvider from '@/components/session-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Your Thoughts, Your Words | ScribeQuantum',
	description: 'Created, designed, and deployed by Mohammad Ali',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
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
					</main>
				</Providers>
				<SessionProvider />
			</body>
		</html>
	)
}
