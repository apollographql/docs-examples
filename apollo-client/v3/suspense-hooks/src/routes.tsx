// Pages
import UseSuspenseQuery from "./useSuspenseQuery";
import UseSuspenseQueryChangingVariables from "./useSuspenseQuery-changing-variables";
import UseSuspenseQueryPartialData from "./useSuspenseQuery-partialData";
import UseSuspenseQueryErrorHandling from "./useSuspsenseQuery-error-handling";
import UseBackgroundQuery from "./useBackgroundQuery";
import Refetch from "./refetch-fetchMore";

export const routes = [
  {
    path: "useSuspenseQuery",
    title: "Fetching with <code>useSuspenseQuery</code>",
    Element: UseSuspenseQuery,
  },
  {
    path: "useSuspenseQuery-changing-variables",
    title: "<code>useSuspenseQuery</code>: changing variables",
    Element: UseSuspenseQueryChangingVariables,
  },
  {
    path: "useSuspenseQuery-partial-data",
    title: "<code>useSuspenseQuery</code>: rendering partial data",
    Element: UseSuspenseQueryPartialData,
  },
  {
    path: "useSuspenseQuery-error-handling",
    title: "<code>useSuspenseQuery</code>: error handling",
    Element: UseSuspenseQueryErrorHandling,
  },
  {
    path: "useBackgroundQuery-useReadQuery",
    title:
      "Fetching with <code>useBackgroundQuery</code> and rendering with <code>useReadQuery</code>",
    Element: UseBackgroundQuery,
  },
  {
    path: "refetch",
    title:
      "Refetching with <code>useSuspenseQuery</code> and <code>useBackgroundQuery</code>",
    Element: Refetch,
  },
];
