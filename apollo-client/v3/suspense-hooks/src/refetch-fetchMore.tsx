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

interface Data {
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
  refetchHandler: () => void;
}

export const GET_DOG_QUERY: TypedDocumentNode<Data, Variables> = gql`
  query GetDog($id: String) {
    dog(id: $id) {
      # By default, an object's cache key is a combination of
      # its __typename and id fields, so we need to fetch the
      # id so our data can be normalized and cached properly.
      #
      # For more information, see the docs on customizing cache IDs:
      # https://www.apollographql.com/docs/react/caching/cache-configuration/#customizing-cache-ids
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
  const [queryRef, { refetch }] = useBackgroundQuery(GET_BREEDS_QUERY);

  const refetchHandler = () => {
    refetch();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dog id="3" queryRef={queryRef} refetchHandler={refetchHandler} />
    </Suspense>
  );
}

function Dog({ id, queryRef, refetchHandler }: DogProps) {
  const { data } = useSuspenseQuery(GET_DOG_QUERY, {
    variables: { id },
  });
  return (
    <>
      Name: {data.dog.name}
      <Suspense fallback={<div>Loading breeds...</div>}>
        <Breeds queryRef={queryRef} />
      </Suspense>
      <button onClick={refetchHandler}>Refetch!</button>
    </>
  );
}

function Breeds({ queryRef }: { queryRef: QueryReference<BreedData> }) {
  const { data } = useReadQuery(queryRef);
  return data.breeds.map(({ characteristics }) =>
    characteristics.map((characteristic) => (
      <div key={characteristic}>{characteristic}</div>
    ))
  );
}

export default App;
