import '@mantine/core/styles.css'; 
import React from 'react';
import './globals.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { Poppins } from 'next/font/google'

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
        <MantineProvider>
          <Header />
            <main>
              {children}
            </main>
          <Footer/>
        </MantineProvider>
      </body>
    </html>
  );
}