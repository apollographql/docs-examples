import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';

// Our GraphQL schema
const typeDefs = `#graphql
  directive @upper on FIELD_DEFINITION

  type Query {
    """
    Write your description here ...

    ***Warning :*** you can use markdown
    """
    hello: String @upper
  }
`;

// Our resolvers (notice the hard-coded string is *not* all-caps)
const resolvers = {
  Query: {
    hello() {
      return 'Hello World!';
    },
  },
};

// Create the base executable schema
let schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({ schema });

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
