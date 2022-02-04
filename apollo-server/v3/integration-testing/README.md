# Integration Testing in Apollo Server v3

This example demonstrates the basics of integration testing using an HTTP Server
and the `apollo-server-express` package.
[See the docs on integration testing for more information](https://www.apollographql.com/docs/apollo-server/testing/testing/).

Check out the `src/__tests__/server.test.ts` file if you'd like to see how we
are defining our test.

## Run locally

To run the tests locally:

```shell
yarn
yarn test
```

To run the server locally:

```shell
yarn
yarn start
```

## Run in CodeSandbox

<a href="https://codesandbox.io/s/github/apollographql/docs-examples/tree/main/apollo-server/v3/integration-testing?fontsize=14&hidenavigation=1&initialpath=%2Fgraphql&theme=dark">
  <img alt="Edit" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

Note that to run tests within CodeSandbox you will need to first fork the
sandbox, then open a new terminal and run `yarn test`.
