import { render as rtlRender, screen } from "@testing-library/react";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { Products } from "../../products";
import { server } from "../mocks/server";
import { makeClient } from "../../client";
import { replaceSchema, schemaProxy } from "../mocks/handlers";

// The following server set-up, reset and teardown would normally be
// done in a `setupTests.ts` file. Since we're using Jest to run both
// Testing Library and MSW tests, we only need to set up the server when
// the tests in this file run in order to demonstrate the global fetch
// mocking approach in the Testing Library tests.
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
// ...end of server set-up that would normally appear in `setupTests.ts`

const render = (renderedClient: ApolloClient<NormalizedCacheObject>) =>
  rtlRender(
    <ApolloProvider client={renderedClient}>
      <Products />
    </ApolloProvider>
  );

describe("Products", () => {
  test("renders", async () => {
    render(makeClient());

    expect(await screen.findByText(/blue jays hat/i)).toBeInTheDocument();
  });

  test("allows resolvers to be updated via .add", async () => {
    schemaProxy.add({
      resolvers: {
        Query: {
          products: () => {
            return [
              {
                id: "2",
                title: "Mets Hat",
              },
            ];
          },
        },
      },
    });

    render(makeClient());

    // the resolver has been updated
    await screen.findByText(/mets hat/i);
  });

  test("allows resolvers to be updated via .fork and replaceSchema", async () => {
    const newSchema = schemaProxy.fork({
      resolvers: {
        Query: {
          products: () => {
            return [
              {
                id: "2",
                title: "Yankees Hat",
              },
            ];
          },
        },
      },
    });

    using _schema = replaceSchema(newSchema);

    render(makeClient());

    // the resolver has been updated
    await screen.findByText(/yankees hat/i);
  });

  test("handles test schema resetting via .reset", async () => {
    schemaProxy.reset();

    render(makeClient());

    await screen.findByText(/blue jays hat/i);
  });
});
