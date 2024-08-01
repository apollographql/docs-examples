import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_DOG_QUERY, Dog } from "./dog";
import React from "react";

const mocks = [
  {
    request: {
      query: GET_DOG_QUERY,
      variables: {
        name: "Buck",
      },
    },
    result: {
      data: {
        dog: { id: "1", name: "Buck", breed: "bulldog" },
      },
    },
  },
];

test("renders without error", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
});

test("should render dog", async () => {
  const dogMock = {
    request: {
      query: GET_DOG_QUERY,
      variables: { name: "Buck" },
    },
    result: {
      data: { dog: { id: 1, name: "Buck", breed: "poodle" } },
    },
  };
  render(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>
  );
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("Buck is a poodle")).toBeInTheDocument();
});

test("should show error UI", async () => {
  const dogMock = {
    request: {
      query: GET_DOG_QUERY,
      variables: { name: "Buck" },
    },
    error: new Error("An error occurred"),
  };
  render(
    <MockedProvider mocks={[dogMock]} addTypename={false}>
      <Dog name="Buck" />
    </MockedProvider>
  );
  expect(await screen.findByText("An error occurred")).toBeInTheDocument();
});
