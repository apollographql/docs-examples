// we import our typeDefs and resolvers for creating an Apollo Server instance for testing
import { createApolloServer } from '../server';

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
// const createTestApolloServer = async () => {
//   const testServer = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   // let the server assign a port for us, then capture the returned url where we can query our server
//   const { url } = await testServer.listen({ port: 0 });
//   return { url, testServer };
// };

describe('e2e demo', () => {
  // before the tests we will spin up a new Apollo Server
  let response;
  beforeAll(async () => {
    // Note we must wrap our object destructuring in parentheses because we already declared these variables
    response = await createApolloServer({ port: 0 });
    console.log(response);
  });

  // after the tests we will stop our server
  afterAll(async () => {
    // await testServer?.stop();
  });

  it('says hello', async () => {
    // send our request to the url of the test server
    // const response = await request(url).post('/').send(queryData);
    // expect(response.errors).toBeUndefined();
    // expect(response.body.data?.hello).toBe('Hello world!');
  });
});
