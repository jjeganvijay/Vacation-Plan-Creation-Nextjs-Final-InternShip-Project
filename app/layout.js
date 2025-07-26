import './globals.css';
import { Providers } from '../components/providers.js';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Vacation Plan Creator',
  description: 'Create and manage your vacation plans with ease.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}