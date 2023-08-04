import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./index.css";
import { link } from "./schema";

// Pages
import App from "./useSuspenseQuery";
// import App from "./useSuspenseQuery-changing-variables";
// import App from "./useSuspenseQuery-partialData";
// import App from "./useBackgroundQuery";
// import App from "./useSuspsenseQuery-error-handling";
// import App from "./refetch-fetchMore";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
