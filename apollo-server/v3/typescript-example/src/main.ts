import { ApolloServer, gql } from 'apollo-server';
// Import our resolvers along with the generated Resolvers type.
import { resolvers } from './resolvers';
import { Resolvers } from './__generated__/resolvers-types';
// Import DocumentNode for schema typing.
import { DocumentNode } from 'graphql';
import path from 'path';
import { readFileSync } from 'fs';

// Import our initialContext along with the ContextOptions interface to ensure proper typing.
import { ContextOptions, initialContext } from './datasources';
import { DataSources } from 'apollo-server-core/dist/graphqlOptions';

const schemaFile = path.join(__dirname, '../src/schema.graphql');
const typeDefs = gql(readFileSync(schemaFile, { encoding: 'utf-8' }));

// This function will create a new Apollo Server instance
const server = new ApolloServer({
  typeDefs: typeDefs as DocumentNode,
  resolvers: resolvers as Resolvers,
  csrfPrevention: true,
  dataSources: (): DataSources<ContextOptions> => {
    return initialContext;
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
