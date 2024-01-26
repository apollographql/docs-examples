// Pages
import UseSuspenseQuery from "./useSuspenseQuery";
import UseSuspenseQueryChangingVariables from "./useSuspenseQuery-changing-variables";
import UseSuspenseQueryPartialData from "./useSuspenseQuery-partialData";
import UseBackgroundQuery from "./useBackgroundQuery";
import Refetch from "./refetch-fetchMore";
import useLoadableQuery from "./useLoadableQuery";

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
  {
    path: "useLoadableQuery",
    title:
      "Fetching data on user interaction with <code>useLoadableQuery</code>",
    Element: useLoadableQuery,
  },
];
