// we import a function that we wrote to create a new instance of Apollo Server
import { createApolloServer } from '../server';

// we'll use supertest to test our server
import request from 'supertest';

// this is the query for our test
const queryData = {
  query: `query sayHello($name: String) {
    hello(name: $name)
  }`,
  variables: { name: 'world' },
};

describe('e2e demo', () => {
  let server, url;

  // before the tests we spin up a new Apollo Server
  beforeAll(async () => {
    // Note we must wrap our object destructuring in parentheses because we already declared these variables
    // We pass in the port as 0 to let the server pick its own ephemeral port for testing
    ({ server, url } = await createApolloServer({ port: 0 }));
  });

  // after the tests we'll stop the server
  afterAll(async () => {
    await server?.stop();
  });

  it('says hello', async () => {
    // send our request to the url of the test server
    const response = await request(url).post('/').send(queryData);
    expect(response.errors).toBeUndefined();
    expect(response.body.data?.hello).toBe('Hello world!');
  });
});
