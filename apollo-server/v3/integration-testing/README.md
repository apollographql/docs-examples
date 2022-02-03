# Integration Testing in Apollo Server v3

This example demonstrates the basics of integration testing using an HTTP Server
and the `apollo-server-express` package.
[See the docs on integration testing for more information](https://www.apollographql.com/docs/apollo-server/testing/testing/)

To make running example easier in CodeSandbox, we have commented out the
function call to start our server locally. If you'd like to run the server
locally, you can uncomment the invocation of `startApolloServer()` and navigate
to http://localhost:4000/graphql to use the Apollo Sandbox.

## Run locally

```shell
yarn
yarn test
```

## Run in CodeSandbox

<a href="https://codesandbox.io/s/github/apollographql/docs-examples/tree/main/apollo-server/v3/integration-testing?fontsize=14&hidenavigation=1&initialpath=%2Fgraphql&theme=dark">
  <img alt="Edit" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>
