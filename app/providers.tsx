'use client'

import { ThemeProvider } from 'next-themes'

interface ProviderProps {
    children: React.ReactNode
}

export function Providers({ children }: ProviderProps) {
  return <ThemeProvider storageKey='theme' attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>{children}</ThemeProvider>
}