# Subscriptions in Apollo Server v3

This example demonstrates a basic subscription operation in Apollo Server. [See the docs on subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions/)

The example server exposes one subscription (`numberIncremented`) that returns an integer that's incremented on the server every second.

After you start up this server, you can test out running a subscription with the Apollo Studio Explorer or GraphQL Playground. You'll see the subscription's value update every second.

```graphql
subscription IncrementingNumber {
  numberIncremented
}
```

## Run locally

```shell
yarn install
yarn start
```

## Run in CodeSandbox

<a href="https://codesandbox.io/s/github/apollographql/docs-examples/tree/main/apollo-server/v3/subscriptions?fontsize=14&hidenavigation=1&initialpath=%2Fgraphql&theme=dark">
  <img alt="Edit server-subscriptions-as3" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>
