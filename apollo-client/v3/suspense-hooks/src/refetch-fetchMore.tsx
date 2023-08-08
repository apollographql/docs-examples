import { Suspense, useTransition } from "react";
import {
  gql,
  TypedDocumentNode,
  useBackgroundQuery,
  useSuspenseQuery,
  QueryReference,
  useReadQuery,
} from "@apollo/client";

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
  isPending: boolean;
  queryRef: QueryReference<BreedData>;
  refetchHandler: () => void;
}

interface BreedsProps {
  isPending: boolean;
  queryRef: QueryReference<BreedData>;
}

export const GET_DOG_QUERY: TypedDocumentNode<Data, Variables> = gql`
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
  const [isPending, startTransition] = useTransition();
  const [queryRef, { refetch }] = useBackgroundQuery(GET_BREEDS_QUERY);

  const refetchHandler = () => {
    startTransition(() => {
      refetch();
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dog
        id="3"
        queryRef={queryRef}
        isPending={isPending}
        refetchHandler={refetchHandler}
      />
    </Suspense>
  );
}

function Dog({ id, queryRef, isPending, refetchHandler }: DogProps) {
  const { data } = useSuspenseQuery(GET_DOG_QUERY, {
    variables: { id },
  });

  return (
    <>
      Name: {data.dog.name}
      <Suspense fallback={<div>Loading breeds...</div>}>
        <Breeds isPending={isPending} queryRef={queryRef} />
      </Suspense>
      <button onClick={refetchHandler}>Refetch!</button>
    </>
  );
}

function Breeds({ queryRef, isPending }: BreedsProps) {
  const { data } = useReadQuery(queryRef);
  return data.breeds.map(({ characteristics }) =>
    characteristics.map((characteristic) => (
      <div style={{ opacity: `${isPending ? 0.5 : 1}` }} key={characteristic}>
        {characteristic}
      </div>
    ))
  );
}

export default App;
