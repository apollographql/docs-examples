console.log("hi");
import { createRoot } from "react-dom/client";
import { Main } from "./main";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://main--hack-the-e-commerce.apollographos.net/graphql",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
export const App = () => (
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>
);

root.render(<App />);
