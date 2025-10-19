import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/shared/components/ui/theme-provider';
import { AppStoreProvider } from '@/lib/aurora/core/stores/AppStoreProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Aurora',
  description:
    'A visual plot timeline tool for architecting complex, multi-threaded storylines. Organize story events, track plot threads, and visualize how your narrative weaves together.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-inter antialiased`}>
        <AppStoreProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        </AppStoreProvider>
      </body>
    </html>
  );
}
