import { Suspense } from "react";
import {
  gql,
  TypedDocumentNode,
  useBackgroundQuery,
  QueryReference,
  useReadQuery,
} from "@apollo/client";
import "./App.css";

interface DogData {
  dog: {
    id: string;
    name: string;
    breed: string;
  };
}

interface BreedData {
  breeds: { id: string; name: string; characteristics: string[] }[];
}

interface Variables {
  id: string;
}

interface DogProps {
  breedsQueryRef: QueryReference<BreedData>;
  dogQueryRef: QueryReference<DogData>;
}

interface BreedsProps {
  queryRef: QueryReference<BreedData>;
}

export const GET_DOG_QUERY: TypedDocumentNode<DogData, Variables> = gql`
  query GetDog($id: String) {
    dog(id: $id) {
      id
      name
      breed
    }
  }
`;

export const GET_BREEDS_QUERY: TypedDocumentNode<BreedData> = gql`
  query GetBreeds {
    breeds {
      id
      name
      characteristics
    }
  }
`;

function App() {
  const [breedsQueryRef] = useBackgroundQuery(GET_BREEDS_QUERY);
  const [dogQueryRef] = useBackgroundQuery(GET_DOG_QUERY, {
    variables: { id: "3" },
  });
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dog dogQueryRef={dogQueryRef} breedsQueryRef={breedsQueryRef} />
    </Suspense>
  );
}

function Dog({ breedsQueryRef, dogQueryRef }: DogProps) {
  const { data } = useReadQuery(dogQueryRef);
  return (
    <>
      Name: {data.dog.name}
      <Suspense fallback={<div>Loading breeds...</div>}>
        <Breeds queryRef={breedsQueryRef} />
      </Suspense>
    </>
  );
}

function Breeds({ queryRef }: BreedsProps) {
  const { data } = useReadQuery(queryRef);
  return data.breeds.map(({ characteristics }) =>
    characteristics.map((characteristic) => (
      <div key={characteristic}>{characteristic}</div>
    ))
  );
}

export default App;
