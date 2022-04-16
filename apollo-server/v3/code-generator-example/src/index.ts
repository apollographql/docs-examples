import { ApolloServer, gql } from "apollo-server";
import { resolvers } from "./resolvers";
import { readFileSync } from "fs";
import path from "path";


const schemaFile = path.join(__dirname, '../src/schema.graphql');

const typeDefs = gql(readFileSync(schemaFile, { encoding: 'utf-8' }));

// This function will create a new server Apollo Server instance
const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers as any,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});