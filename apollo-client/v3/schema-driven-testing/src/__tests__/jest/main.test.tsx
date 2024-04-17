import {
  createSchemaFetch,
  createTestSchema,
} from "@apollo/client/testing/experimental";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { render, screen } from "@testing-library/react";
import graphqlSchema from "../../../schema.graphql";
import { client } from "../../client";
import { ApolloProvider } from "@apollo/client";
import { Main } from "../../main";
// import { Resolvers } from "../../__generated__/resolvers-types";

const staticSchema = makeExecutableSchema({ typeDefs: graphqlSchema });

const schema = createTestSchema(staticSchema, {
  resolvers: {
    Query: {
      products: () => [
        {
          id: "1",
          mediaUrl: "https://example.com/image.jpg",
        },
        {
          id: "2",
          mediaUrl: "https://example.com/image2.jpg",
        },
      ],
    },
  },
  scalars: {
    Int: () => 6,
    Float: () => 22.1,
    String: () => "string",
  },
});

describe("Main", () => {
  it("should work", async () => {
    const forkedSchema = schema.fork();

    // Symbol.dispose is not defined
    // using _fetch = createSchemaFetch(forkedSchema).mockGlobal();
    const { restore } = createSchemaFetch(forkedSchema).mockGlobal();

    render(
      <ApolloProvider client={client}>
        <Main />
      </ApolloProvider>
    );

    await screen.findByText("1 - https://example.com/image.jpg");
    await screen.findByText("2 - https://example.com/image2.jpg");

    restore();
  });
});
