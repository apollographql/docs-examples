import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { BooksDataSource } from './datasources.js';
// Here we import the automatically generated Book type, so we can use it in our
// context typing.
import { Book } from './__generated__/resolvers-types';
import resolvers from './resolvers/index.js';
import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// If you are using ESM module syntax you can redefine `__dirname` as
// shown below. If you are using CJS syntax you can use `__dirname` directly.
const __dirname = dirname(fileURLToPath(import.meta.url));
const schemaFile = path.join(__dirname, '../schema.graphql');
// Once we have our schema's file path, read in our schema.
const typeDefs = readFileSync(schemaFile, { encoding: 'utf-8' });

export interface MyContext {
  dataSources: {
    booksAPI: BooksDataSource;
  };
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => {
    return {
      // We are using a static data set for this example, but normally
      // this would be where you'd add your data source connections
      // or your REST API classes.
      dataSources: {
        booksAPI: new BooksDataSource(),
      },
    };
  },
});

console.log(`🚀 Server listening at: ${url}`);
