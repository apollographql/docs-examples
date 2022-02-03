const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const http = require('http');

const typeDefs = gql`
  type Query {
    hello(name: String): String!
  }
`;

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name}!`,
  },
};

const startApolloServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  await server.applyMiddleware({
    app,
    path: '/graphql',
  });

  // // The `listen` method launches a web server.
  // Start our server if we're not in a test env.
  // if we're in a test env, we'll manually start it in a test
  if (process.env.NODE_ENV !== 'test') {
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    );
  }
};

// Uncomment the below line to start the server
// startApolloServer();

module.exports = { typeDefs, resolvers, ApolloServer };
