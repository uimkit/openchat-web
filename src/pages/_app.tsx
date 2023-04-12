import React from 'react';
import type { AppProps } from 'next/app';
import { UserProvider } from '@authok/nextjs-authok/client';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import { customTheme } from '@/lib/theme'

export default function App({ Component, pageProps }: AppProps): React.ReactElement<AppProps> {
  const { user } = pageProps;

  const Layout = Component['layout'] ? Component['layout'] : ({ children }) => <>{children}</>;

  const { ToastContainer } = createStandaloneToast(customTheme);

  return (
    <>
      <ToastContainer/>
      <ChakraProvider theme={customTheme}>
        <UserProvider user={user}>
          <Layout><Component {...pageProps} /></Layout>
        </UserProvider>
      </ChakraProvider>
    </>
  );
}