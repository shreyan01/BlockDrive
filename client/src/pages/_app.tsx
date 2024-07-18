// pages/_app.tsx
import { AppProps } from 'next/app';
import { UserProvider } from '../context/UserContext';
import '../styles/main.css'
import React from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default MyApp;

