import { useState, Suspense, startTransition } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";

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

interface DogProps {
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
    }
  }
`;

function App() {
  const { data } = useSuspenseQuery(GET_DOGS_QUERY);
  const [selectedDog, setSelectedDog] = useState(data.dogs[0].id);

  return (
    <>
      <select
        onChange={(e) => {
          startTransition(() => {
            setSelectedDog(e.target.value);
          });
        }}
      >
        {data.dogs.map((dog) => (
          <option key={dog.id} value={dog.id}>
            {dog.name}
          </option>
        ))}
      </select>
      {/* If you want to activate this error boundary, uncomment the
      GraphQLError import on L10 and L78 inside the `dog` resolver
      in order to throw a GraphQL error which will be thrown by the Dog 
      component below, activating the ErrorBoundary on the next line */}
      <ErrorBoundary FallbackComponent={() => <div>Something went wrong</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <Dog id={selectedDog} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

function Dog({ id }: DogProps) {
  const { data } = useSuspenseQuery(GET_DOG_QUERY, {
    variables: { id },
  });

  return (
    <>
      <div>Name: {data.dog.name}</div>
      <div>Breed: {data.dog.breed}</div>
    </>
  );
}

export default App;
