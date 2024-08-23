import { Plus_Jakarta_Sans } from 'next/font/google';

import './globals.css';
import { cn } from './lib/utils';
import { ThemeProvider } from '@/components/theme-provider';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'CarePulse',
  description:
    'CarePlus is a hospital management system created with the help of NextJS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-dark-300 font-sans antialiased',
          jakartaSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
