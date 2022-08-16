import React from "react";
import { gql, useQuery } from "@apollo/client";

// Make sure that both the query and the component are exported
export const GET_DOG_QUERY = gql`
  query GetDog($name: String) {
    dog(name: $name) {
      id
      name
      breed
    }
  }
`;

export function Dog({ name }) {
  const { loading, error, data } = useQuery(GET_DOG_QUERY, {
    variables: { name }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <p>
      {data.dog.name} is a {data.dog.breed}
    </p>
  );
}
