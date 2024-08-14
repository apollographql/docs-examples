import React from "react";
import { gql, useMutation } from "@apollo/client";

export const DELETE_DOG_MUTATION = gql`
  mutation deleteDog($name: String!) {
    deleteDog(name: $name) {
      id
      name
      breed
    }
  }
`;

export function DeleteButton() {
  const [mutate, { loading, error, data }] = useMutation(DELETE_DOG_MUTATION);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (data) return <p>Deleted!</p>;
  return (
    <button onClick={() => mutate({ variables: { name: "Buck" } })}>
      Click to Delete Buck
    </button>
  );
}
