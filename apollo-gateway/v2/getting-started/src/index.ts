import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloGateway } from '@apollo/gateway';
import { readFileSync } from 'fs';

// This file is fetched from https://supergraph.demo.starstuff.dev/
// See https://www.apollographql.com/docs/router/quickstart#2-download-the-example-supergraph-schema
const supergraphSdl = readFileSync('./supergraph.graphql').toString();

// Initialize an ApolloGateway instance and pass it
// the supergraph schema as a string
const gateway = new ApolloGateway({
  supergraphSdl,
});

// Pass the ApolloGateway to the ApolloServer constructor
const server = new ApolloServer({
  gateway,
});

// Note the top-level `await`!
const { url } = await startStandaloneServer(server);
console.log(`🚀 Gateway Server ready at ${url}`);
