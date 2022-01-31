import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { PubSub } from "graphql-subscriptions";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

const PORT = 4000;
const pubsub = new PubSub();

// Schema definition
const typeDefs = gql`
  type Query {
    currentNumber: Int
  }

  type Subscription {
    numberIncremented: Int
  }
`;

// Resolver map
const resolvers = {
  Query: {
    currentNumber() {
      return currentNumber;
    },
  },
  Subscription: {
    numberIncremented: {
      subscribe: () => pubsub.asyncIterator(["NUMBER_INCREMENTED"]),
    },
  },
};

// Create schema, which will be used separately by ApolloServer and
// the websocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
});
await server.start();

// Set up HTTP.
const app = express();
const httpServer = createServer(app);
server.applyMiddleware({ app });
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
useServer({ schema }, wsServer);

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
  );
});

let currentNumber = 0;
function incrementNumber() {
  currentNumber++;
  pubsub.publish("NUMBER_INCREMENTED", { numberIncremented: currentNumber });
  setTimeout(incrementNumber, 1000);
}
// Start incrementing
incrementNumber();
