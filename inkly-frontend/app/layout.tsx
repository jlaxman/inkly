import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Inkly - Custom Apparel, Gifts & More',
  description: 'Premium platform for custom apparel, gifts, and more. Create something unique.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#000',
              color: '#fff',
              borderRadius: '8px',
            },
          }}
        />
      </body>
    </html>
  );
}
