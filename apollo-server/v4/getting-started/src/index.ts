// import { standaloneServer } from '../../packages/server/src/standalone';
// import { ApolloServer } from '../../packages/server/src';
// import { gql } from 'graphql-tag';
import { gql, ApolloServer, startStandaloneServer } from '@apollo/server';

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Quote {
    written: String
  }

  type Query {
    books: [Book]
    quote: Quote
  }
`;

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

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: (_, __, context) => {
      console.log(context);
      return books;
    },
  },
};

// interface MyContext {
//   token: string;
//   dataSources: {
//     quotesAPI: QuotesAPI;
//   };
// }

// // returns an ApolloServerStandalone instance
// const apolloServerInstance = new ApolloServer<MyContext>({
//   typeDefs,
//   resolvers,
// });

// const { url } = await standaloneServer(apolloServerInstance, {
//   async context({ req, res }) {
//     return {
//       token: get,
//     };
//   },
// }).listen({ port: 4000 });
// //  The listen() method accepts the same
// // arguments that http.Server's listen() method does (in the options form only).

// console.log(`🚀  Server ready at: ${url}`);

// class DogsDataSource {
//   private cache: KeyValueCache<string>;
//   constructor({ cache }) {
//     this.cache = cache;
//   }

//   async getDogs() {
//     return [{ name: 'Fido' }];
//   }
// }
// interface MyContext {
//   dataSources: {
//     dogs: DogsDataSource;
//   };
// }

// const server = new ApolloServer<MyContext>({
//   typeDefs: `
//     type Query { dog: Dog }
//     type Dog { name: String }
//   `,
//   resolvers: {
//     Query: {
//       dog: async (_, __, context) => {
//         return (await context.dataSources.dogs.getDogs())[0];
//       },
//     },
//   },
// });
// // HTTPApolloServer<MyContext>
// standaloneServer(server, {
//   async context({ req, res }) {
//     return {
//       dataSources: { dogs: new DogsDataSource({ cache: server['internals'].cache }) },
//     };
//   },
// });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

// HTTPApolloServer<MyContext>

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`server ready at ${url}`);
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
//
// await standaloneServer(server, {
//   async context({ req, res }) {
//     return {
//       token: 'test',
//     };
//   },
// },listen: { port: 4000 },
// })

//  The listen() method accepts the same
// arguments that http.Server's listen() method does (in the options form only).

//  The listen() method accepts the same
// arguments that http.Server's listen() method does (in the options form only).
