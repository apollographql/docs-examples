import { Suspense } from "react";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import "./App.css";

interface Data {
  dog: {
    id: string;
    name: string;
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
    # By default, an object's cache key is a combination of its
    # __typename and id fields, so we should always make sure the
    # id is in the response so our data can be normalized and cached properly.
    dog(id: $id) {
      id
      name
    }
  }
`;

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dog
        id="3" // let's fetch Mozzarella
      />
    </Suspense>
  );
}

function Dog({ id }: DogProps) {
  const { data } = useSuspenseQuery(GET_DOG_QUERY, {
    variables: { id },
  });
  return <>Name: {data.dog.name}</>;
}

export default App;
