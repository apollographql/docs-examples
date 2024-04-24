import {
  createSchemaFetch,
  createTestSchema,
} from "@apollo/client/testing/experimental";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { render as rtlRender, screen } from "@testing-library/react";
import graphqlSchema from "../../../schema.graphql";
import { makeClient } from "../../client";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { Products } from "../../products";
import { Suspense } from "react";

const staticSchema = makeExecutableSchema({ typeDefs: graphqlSchema });

const schema = createTestSchema(staticSchema, {
  resolvers: {
    Query: {
      products: () =>
        Array.from({ length: 5 }, (_element, id) => ({
          id,
          mediaUrl: `https://example.com/image${id}.jpg`,
        })),
    },
  },
  scalars: {
    Int: () => 6,
    Float: () => 22.1,
    String: () => "default string",
  },
});

const render = (renderedClient: ApolloClient<NormalizedCacheObject>) =>
  rtlRender(
    <ApolloProvider client={renderedClient}>
      <Suspense fallback="Loading...">
        <Products />
      </Suspense>
    </ApolloProvider>
  );

describe("Products", () => {
  it("renders", async () => {
    using _fetch = createSchemaFetch(schema).mockGlobal();

    render(makeClient());

    await screen.findByText("Loading...");

    // title is rendering the default string scalar
    const findAllByText = await screen.findAllByText(/default string/);
    expect(findAllByText).toHaveLength(5);

    // the products resolver is returning 5 products
    await screen.findByText(/0/);
    await screen.findByText(/1/);
    await screen.findByText(/2/);
    await screen.findByText(/3/);
    await screen.findByText(/4/);
  });
});
