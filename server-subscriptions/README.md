# Subscriptions in Apollo Server

This example demonstrates a basic subscription operation in Apollo Server. [See the docs on subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions)

The example server exposes one subscription (`numberIncremented`) that returns an integer that's incremented on the server every second. The example requires only the `apollo-server` library.

After you start up this server, you can test out running a subscription with the Apollo Studio Explorer or GraphQL Playground. You'll see the subscription's value update every second.
