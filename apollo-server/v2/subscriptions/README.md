# Subscriptions in Apollo Server

This example demonstrates a basic subscription operation in Apollo Server v2. [See the v2 docs on subscriptions](https://www.apollographql.com/docs/apollo-server/v2/data/subscriptions/)

The example server exposes one subscription (`numberIncremented`) that returns an integer that's incremented on the server every second. The example requires only the `apollo-server` library.

After you start up this server, you can test out running a subscription with the Apollo Studio Explorer or GraphQL Playground. You'll see the subscription's value update every second.

## Run locally

```shell
yarn install
yarn start
```

## Run in CodeSandbox

<a href="https://codesandbox.io/s/github/apollographql/docs-examples/tree/main/apollo-server/v2/subscriptions?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit server-subscriptions" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>
