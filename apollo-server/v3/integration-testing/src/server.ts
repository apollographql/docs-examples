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

// This function will create a new server Apollo Server instance
export const createApolloServer = async (options = { port: 4000 }) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const serverInfo = await server.listen(options);
  if (process.env.NODE_ENV !== 'test') {
    console.log(
      `🚀 Query endpoint ready at http://localhost:${options.port}${server.graphqlPath}`,
    );
  }

  // serverInfo is an object containing the server instance and the url the server is listening on
  return serverInfo;
};
