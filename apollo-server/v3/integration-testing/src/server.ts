import { ApolloServer, gql } from 'apollo-server';

// Schema definition
export const typeDefs = gql`
  type Query {
    hello(name: String): String!
  }
`;

// Resolver map
export const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name}!`,
  },
};

export const createApolloServer = async (options = { port: 4000 }) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  return server
    .listen(options, () => {
      if (process.env.NODE_ENV !== 'test') {
        console.log(
          `🚀 Query endpoint ready at http://localhost:${options.port}${server.graphqlPath}`,
        );
      }
    })
    .then((serverResponse) => {
      return serverResponse;
    });
};
