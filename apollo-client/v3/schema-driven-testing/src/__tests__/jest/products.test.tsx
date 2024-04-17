import {
  createSchemaFetch,
  createTestSchema,
} from "@apollo/client/testing/experimental";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { render, screen } from "@testing-library/react";
import graphqlSchema from "../../../schema.graphql";
import { makeClient } from "../../client";
import { ApolloProvider } from "@apollo/client";
import { Products } from "../../products";

const staticSchema = makeExecutableSchema({ typeDefs: graphqlSchema });

const schema = createTestSchema(staticSchema, {
  resolvers: {
    Query: {
      products: () =>
        new Array(5).fill(null).map((_, i) => ({
          id: i,
          mediaUrl: `https://example.com/image${i}.jpg`,
        })),
    },
  },
  scalars: {
    Int: () => 6,
    Float: () => 22.1,
    String: () => "default string",
  },
});

describe("Products", () => {
  it("renders", async () => {
    const forkedSchema = schema.fork();

    // Symbol.dispose is not defined
    // jest bug: https://github.com/jestjs/jest/issues/14874
    // fix is available in https://github.com/jestjs/jest/releases/tag/v30.0.0-alpha.3
    using _fetch = createSchemaFetch(forkedSchema).mockGlobal();

    render(
      <ApolloProvider client={makeClient()}>
        <Products />
      </ApolloProvider>
    );

    // title is rendering the default string scalar
    const findAllByText = await screen.findAllByText("default string");
    expect(findAllByText).toHaveLength(5);

    // the products resolver is returning 5 products
    await screen.findByText("0 - https://example.com/image0.jpg");
    await screen.findByText("1 - https://example.com/image1.jpg");
    await screen.findByText("2 - https://example.com/image2.jpg");
    await screen.findByText("3 - https://example.com/image3.jpg");
    await screen.findByText("4 - https://example.com/image4.jpg");
  });
});
