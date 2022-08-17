# Subscriptions in Apollo Server v4

This example demonstrates a basic subscription operation in Apollo Server. [See the docs on subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions/)

The example server exposes one subscription (`numberIncremented`) that returns an integer that's incremented on the server every second.

After you start up this server, you can test out running a subscription with the Apollo Studio Explorer by following the link from http://localhost:4000/graphql to the Apollo Sandbox. You might need to edit the Apollo Sandbox connection settings to select the [`graphql-ws` subscriptions implementation](https://www.apollographql.com/docs/studio/explorer/additional-features/#subscription-support). You'll see the subscription's value update every second.

```graphql
subscription IncrementingNumber {
  numberIncremented
}
```

## Run locally

```shell
npm install
npm start
```

## Run in CodeSandbox

<a href="https://codesandbox.io/s/github/apollographql/docs-examples/tree/main/apollo-server/v4/subscriptions-graphql-ws?fontsize=14&hidenavigation=1&initialpath=%2Fgraphql&theme=dark">
  <img alt="Edit" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>
