const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { SchemaDirectiveVisitor } = require ('@graphql-tools/utils');
const { defaultFieldResolver } = require('graphql');

const typeDefs = gql`
  directive @upper on FIELD_DEFINITION

  type Query {
    hello: String @upper
  }
`;

const resolvers = {
  Query: {
    hello() {
      return 'Hello World!';
    }
  }
};

class UpperCaseDirective extends SchemaDirectiveVisitor {

  // Called on server startup for each @upper field
  visitFieldDefinition(field) {

    // Obtain the field's resolver
    const { resolve = defaultFieldResolver } = field;

    // *Replace* the field's resolver with a function
    // that calls the *original* resolver, then converts
    // the result to uppercase before returning
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      if (typeof result === 'string') {
        return result.toUpperCase();
      }
      return result;
    };
  }
}

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      upper: UpperCaseDirective,
    }
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
