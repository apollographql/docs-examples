# Apollo Server and GraphQL Code Generator example

This example demonstrates how to set up the Apollo Server using types generated from the [GraphQL Code Generator](https://www.the-guild.dev/graphql/codegen). See [Generating types from a GraphQL Schema](https://www.apollographql.com/docs/apollo-server/v4/workflow/generate-types) for more information.

GraphQL Code Generator generates our types in the `src/__generated___/resolvers.ts` file. Take a look at the `src/resolver.ts` file to see how we use the generated types to set up type checking for our resolvers.

## Run locally

To run this example locally:

```bash
npm i && npm start
```

When your server is up you can navigate to [http://localhost:4000/](http://localhost:4000/) in your favorite browser and use the [Apollo Sandbox](https://www.apollographql.com/docs/studio/explorer/sandbox/) to perform GraphQL operations against the server.

## Additional Resources

Looking to use TypeScript with [Apollo Federation](https://www.apollographql.com/docs/federation)? Our [Subgraph Template](https://github.com/apollographql/subgraph-template-typescript-apollo-server) lays down the ground work so you can quickly set up a subgraph with generated types.
