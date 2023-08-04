import { Suspense } from "react";
import {
  gql,
  TypedDocumentNode,
  useSuspenseQuery,
  useApolloClient,
} from "@apollo/client";
import "./App.css";

interface Data {
  dog: {
    id: string;
    name: string;
    breed: string;
  };
}

interface Variables {
  id: string;
}

interface DogProps {
  id: string;
}

export const GET_DOG_QUERY: TypedDocumentNode<Data, Variables> = gql`
  query GetDog($id: String) {
    dog(id: $id) {
      id
      name
      breed
    }
  }
`;

const GET_DOG_QUERY_PARTIAL: TypedDocumentNode = gql`
  query GetDog($id: String) {
    dog(id: $id) {
      # By default, an object's cache key is a combination of its
      # __typename and id fields, so we should always make sure the
      # id is in the response so our data can be normalized and cached properly.
      id
      name
    }
  }
`;

function App() {
  const client = useApolloClient();

  client.cache.writeQuery({
    query: GET_DOG_QUERY_PARTIAL,
    variables: { id: "1" },
    data: { dog: { id: "1", name: "Buck" } },
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dog id="1" />
    </Suspense>
  );
}

function Dog({ id }: DogProps) {
  const { data } = useSuspenseQuery(GET_DOG_QUERY, {
    variables: { id },
    returnPartialData: true,
  });

  return (
    <>
      <div>Name: {data?.dog?.name}</div>
      <div>Breed: {data?.dog?.breed}</div>
    </>
  );
}

export default App;
