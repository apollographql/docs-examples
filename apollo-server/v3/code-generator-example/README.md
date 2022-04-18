# Apollo Server and Code Generator Example

This example demonstrates how to set up the ["batteries-included" Apollo Server package](https://www.apollographql.com/docs/apollo-server/integrations/middleware#apollo-server) using types generated using the [GraphQL Code Generator](https://www.graphql-code-generator.com/).

<!-- TODO: create article based on this example and plug the link here. -->

The `src/resolvers.ts` file shows how to create both `Query` and `Mutation` resolvers using automatically generated types.

## Run locally

To run this example locally:

```bash
npm run dev
```

When your server is up you can navigate to [http://localhost:4000/](http://localhost:4000/) in your favorite browser and use the [Apollo Sandbox](https://www.apollographql.com/docs/studio/explorer/sandbox/) to perform GraphQL operations against the server.
