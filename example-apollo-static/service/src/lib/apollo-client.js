import { ApolloClient, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    uri: process.env.APOLLO_ROUTER_URL || 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  });
});
