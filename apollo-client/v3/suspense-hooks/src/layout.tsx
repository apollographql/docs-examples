import { Outlet, useLocation } from "react-router-dom";
import { routes } from "./routes";
import { useMemo } from "react";

export function Layout() {
  const { pathname } = useLocation();
  const title = useMemo(
    () => routes.find((route) => `/${route.path}` === pathname)?.title || "",
    [pathname]
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Apollo Client Suspense Hook Examples</h1>
        <p>
          This application contains the code samples that appear in{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.apollographql.com/docs/react/data/suspense"
          >
            Apollo Client's Suspense hooks documentation
          </a>
          .
        </p>

        <nav>
          <ul>
            {routes.map(({ path, title }) => (
              <li key={path}>
                <a
                  href={`/${path}`}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className="Grid-column">
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
        <Outlet />
      </div>
    </div>
  );
}
