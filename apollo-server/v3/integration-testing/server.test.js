// we import our typeDefs and resolvers for creating a new Apollo Server for testing
const { typeDefs, resolvers, ApolloServer } = require('./server.js');
const express = require('express');
const { createServer } = require('http');

// we will use supertest to test our server
const request = require('supertest');

// this is the query we use for our test
const queryData = {
  query: `query sayHello($name: String) {
    hello(name: $name)
  }`,
  variables: { name: 'world' },
};

// create a new Apollo server instance for testing
const createTestApolloServer = async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await testServer.start();
  return testServer;
};

// create a new http server for testing
const createTestHttpServer = async (server) => {
  // create our test
  const app = express();

  await server.applyMiddleware({
    app,
    path: '/graphql',
  });

  const httpServer = createServer(app);
  const port = process.env.PORT || 3000;
  httpServer.listen({ port });

  return { httpServer, expressApp: app };
};

describe('e2e demo', () => {
  let httpServer;

  // before the tests we will create our http server
  beforeAll(async () => {
    const testApolloServer = await createTestApolloServer();
    const testHttpServer = await createTestHttpServer(testApolloServer);
    expressApp = testHttpServer.expressApp;
    httpServer = testHttpServer.httpServer;
  });

  // after the tests we will stop our server
  afterAll(async () => await httpServer?.close());

  it('says hello', async () => {
    const response = await request(expressApp).post('/graphql').send(queryData);
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.hello).toBe('Hello world!');
  });
});
