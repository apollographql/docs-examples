import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./client";
import { Main } from "./main";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
export const App = () => (
  <ApolloProvider client={client}>
    <Main />
  </ApolloProvider>
);

root.render(<App />);
