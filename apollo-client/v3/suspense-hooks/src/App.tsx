import { gql, TypedDocumentNode } from "@apollo/client";
import { useSuspenseQuery } from "@apollo/client";
import "./App.css";

interface Data {
  dog: {
    id: string;
    name: string;
    breed: string;
  };
}

interface Variables {
  name: string;
}

export const GET_DOG_QUERY: TypedDocumentNode<Data, Variables> = gql`
  query GetDog($name: String) {
    dog(name: $name) {
      id
      name
      breed
    }
  }
`;

function App() {
  const name = "Buck";
  const { data } = useSuspenseQuery(GET_DOG_QUERY, {
    variables: { name },
  });
  return <div className="App">Dog: {data.dog.name}</div>;
}

export default App;
