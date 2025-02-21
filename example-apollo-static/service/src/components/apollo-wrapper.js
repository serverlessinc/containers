'use client';

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';
import { getClient } from '../lib/apollo-client';

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={getClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
