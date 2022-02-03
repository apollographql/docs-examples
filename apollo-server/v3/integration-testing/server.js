// @ts-check
const { createServer } = require('http');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Schema definition
const typeDefs = gql`
  type Query {
    hello(name: String): String!
  }
`;

// Resolver map
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name}!`,
  },
};

(async () => {
  const PORT = 4000;
  const app = express();
  const httpServer = createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  await server.applyMiddleware({
    app,
    path: '/graphql',
  });

  // // The `listen` method launches a web server.
  // Start our server if we're not in a test env.
  // if we're in a test env, we'll manually start it in a test
  if (process.env.NODE_ENV !== 'test') {
    httpServer.listen(PORT, () => {
      console.log(
        `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`,
      );
    });
  }
})();

// exporting these for testing
module.exports = { typeDefs, resolvers, ApolloServer };
