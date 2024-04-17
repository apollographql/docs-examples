import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import { Products } from "./products";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

export const App = () => (
  <ApolloProvider client={client}>
    <main>
      <Products />
    </main>
  </ApolloProvider>
);

root.render(<App />);
