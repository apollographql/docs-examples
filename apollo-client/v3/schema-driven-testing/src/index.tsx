import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import { Products } from "./products";
import { Suspense } from "react";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

export const App = () => (
  <ApolloProvider client={client}>
    <Suspense fallback="Loading...">
      <Products />
    </Suspense>
  </ApolloProvider>
);

root.render(<App />);
