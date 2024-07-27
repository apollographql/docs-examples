import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { DeleteButton, DELETE_DOG_MUTATION } from "./delete-dog";
import { expect, test } from 'vitest'

test("should render without error", () => {
  render(
    <MockedProvider mocks={[]}>
      <DeleteButton />
    </MockedProvider>
  );
});

test("should render loading and success states on delete", async () => {
  const mocks = [
    {
      request: {
        query: DELETE_DOG_MUTATION,
        variables: { name: "Buck" },
      },
      result: { data: { deleteDog: { name: "Buck", breed: "Poodle", id: 1 } } },
    },
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <DeleteButton />
    </MockedProvider>
  );

  // Find the button element...
  const button = await screen.findByText("Click to Delete Buck");
  userEvent.click(button); // Simulate a click and fire the mutation

  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("Deleted!")).toBeInTheDocument();
});
