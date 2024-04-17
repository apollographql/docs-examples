import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://main--hack-the-e-commerce.apollographos.net/graphql",
});

export const makeClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
};

export const client = makeClient();
