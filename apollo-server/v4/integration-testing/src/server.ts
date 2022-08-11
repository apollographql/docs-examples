import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// Schema definition
export const typeDefs = `
  #graphql
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

  const { url } = await await startStandaloneServer(server, { listen: options });

  if (process.env.NODE_ENV !== 'test') {
    console.log(`🚀 Query endpoint ready at ${url}`);
  }

  // return the server instance and the url the server is listening on
  return { server, url };
};

// For simplicity we create our server in this file,
// but in a real app you'd export `createApolloServer` into
// another file and call it elsewhere.
if (process.env.NODE_ENV !== 'test') {
  await createApolloServer();
}
