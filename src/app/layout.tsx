import '@mantine/core/styles.css'; 
import React from 'react';
import './globals.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { Poppins } from 'next/font/google'
import { FavoritesProvider } from './context/FavoritesProvider';
import { PageLoader } from './Components/PageLoader';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata = {
  title: 'Calipso',
  description: 'Movie Service',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="icon" href="/icon.svg" />
      </head>
      <body className={poppins.className}>
        <FavoritesProvider>
          <PageLoader>
            <MantineProvider>
              <Header />
                <main>
                  {children}
                </main>
              <Footer/>
            </MantineProvider>
          </PageLoader>
        </FavoritesProvider>
      </body>
    </html>
  );
}