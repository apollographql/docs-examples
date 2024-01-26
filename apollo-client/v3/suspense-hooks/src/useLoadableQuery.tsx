import { Suspense } from "react";
import {
  gql,
  QueryReference,
  TypedDocumentNode,
  useLoadableQuery,
  useReadQuery,
  useSuspenseQuery,
} from "@apollo/client";

interface DogsData {
  dogs: {
    id: string;
    name: string;
  }[];
}

interface DogData {
  dog: {
    id: string;
    name: string;
    breed: string;
  };
}

interface Variables {
  id: string;
}

export const GET_DOG_QUERY: TypedDocumentNode<DogData, Variables> = gql`
  query GetDog($id: String) {
    dog(id: $id) {
      # By default, an object's cache key is a combination of its
      # __typename and id fields, so we should always make sure the
      # id is in the response so our data can be normalized and cached properly.
      id
      name
      breed
    }
  }
`;

export const GET_DOGS_QUERY: TypedDocumentNode<DogsData, Variables> = gql`
  query GetDogs {
    dogs {
      id
      name
      breed
    }
  }
`;

function App() {
  const { data } = useSuspenseQuery(GET_DOGS_QUERY);
  const [loadDog, queryRef] = useLoadableQuery(GET_DOG_QUERY);

  return (
    <>
      <select onChange={(e) => loadDog({ id: e.target.value })}>
        {data.dogs.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <Suspense fallback={<div>Loading...</div>}>
        {queryRef && <Dog queryRef={queryRef} />}
      </Suspense>
    </>
  );
}

interface DogProps {
  queryRef: QueryReference<DogData>;
}

function Dog({ queryRef }: DogProps) {
  const { data } = useReadQuery(queryRef);

  return (
    <>
      <div>Name: {data.dog.name}</div>
      <div>Breed: {data.dog.breed}</div>
    </>
  );
}

export default App;
