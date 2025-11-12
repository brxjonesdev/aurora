import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/shared/components/ui/theme-provider';
import { SidebarProvider } from '@/lib/shared/components/ui/sidebar';
import { FileSystemProvider } from '@/lib/apricity/core/stores/file-system-provider';

    const notoSans = Noto_Sans({
      variable: '--font-noto-sans',
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
      <body className={`${notoSans.variable} font-app antialiased`}>
        <FileSystemProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={true}>{children}</SidebarProvider>
          </ThemeProvider>
        </FileSystemProvider>
      </body>
    </html>
  );
}
