import { useState, Suspense, startTransition } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import "./App.css";

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
  const [selectedDog, setSelectedDog] = useState(data.dogs[0].name);
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
