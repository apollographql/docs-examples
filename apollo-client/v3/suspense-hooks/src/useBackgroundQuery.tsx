import { Suspense } from "react";
import {
  gql,
  TypedDocumentNode,
  useBackgroundQuery,
  useSuspenseQuery,
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
  id: string;
  queryRef: QueryReference<BreedData>;
  // dogQueryRef: QueryReference<DogData>;
}

interface BreedsProps {
  queryRef: QueryReference<BreedData>;
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
  // Fetch now
  const [queryRef] = useBackgroundQuery(GET_BREEDS_QUERY);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dog id="3" queryRef={queryRef} />
    </Suspense>
  );
}

function Dog({ id, queryRef }: DogProps) {
  const { data } = useSuspenseQuery(GET_DOG_QUERY, {
    variables: { id },
  });

  return (
    <>
      Name: {data.dog.name}
      <Suspense fallback={<div>Loading breeds...</div>}>
        <Breeds queryRef={queryRef} />
      </Suspense>
    </>
  );
}

interface BreedsProps {
  queryRef: QueryReference<BreedData>;
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
