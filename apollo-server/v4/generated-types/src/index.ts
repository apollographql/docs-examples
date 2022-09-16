import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// Here we import the automatically generated Book type, so we can use it in our
// context typing.
import { Book } from './__generated__/resolvers-types';
import resolvers from './resolvers.js';
import typeDefs from './schema.js';

export interface MyContext {
  dataSources: {
    books: Book[];
  };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

// Our example static data set
const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const { url } = await startStandaloneServer(server, {
  context: async () => {
    return {
      // We are using a static data set for this example, but normally
      // this would be where you'd add your data source connections
      // or your REST API classes.
      dataSources: { books },
    };
  },
});

console.log(`🚀 Server listening at: ${url}`);
