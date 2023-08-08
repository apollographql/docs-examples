import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { link } from "./schema";
import { Layout } from "./layout";
import { routes } from "./routes";

import "./index.css";

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
      <Router future={{ v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {routes.map(({ path, Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
