import express, { json } from "express";
import cors from "cors";
import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";
import resolvers from "./resolvers.js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

//highlight-start
const typeDefs = gql(
  readFileSync(resolve(__dirname, "..", "schema.graphql"), {
    encoding: "utf-8",
  })
);

const schema = buildSubgraphSchema({ typeDefs, resolvers });
const server = new ApolloServer({
  schema,
});
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

app.use("/graphql", cors(), json(), expressMiddleware(server));

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
