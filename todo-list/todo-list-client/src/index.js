import React from "react";
import { render } from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql
} from "@apollo/client";

// If running locally with a local version of the to-do server,
// change this URL to http://localhost:4000
const serverURL = 'https://sxewr.sse.codesandbox.io/';

const client = new ApolloClient({
  uri: serverURL,
  cache: new InMemoryCache()
});

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

// Component for adding a to-do item
function AddTodo() {
  let input;
  const [addTodo] = useMutation(ADD_TODO, {
    update(
      cache,
      {
        data: { addTodo }
      }
    ) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: addTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  type
                }
              `
            });
            return existingTodos.concat(newTodoRef);
          }
        }
      });
    }
  });

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">Create item</button>
      </form>
    </div>
  );
}

const GET_TODOS = gql`
  {
    todos {
      id
      type
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: String!, $type: String!) {
    updateTodo(id: $id, type: $type) {
      id
      type
    }
  }
`;

// Component for displaying the current to-do list
function Todos() {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [
    updateTodo,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(UPDATE_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const todos = data.todos.map(({ id, type }) => {
    let input;

    return (
      <li key={id}>
        <p>{type}</p>
        <form
          onSubmit={e => {
            e.preventDefault();
            updateTodo({ variables: { id, type: input.value } });

            input.value = "";
          }}
        >
          <input
            ref={node => {
              input = node;
            }}
          />
          <button type="submit">Update item</button>
        </form>
        {mutationLoading && <p>Loading...</p>}
        {mutationError && <p>Error: {mutationError.message}</p>}
      </li>
    );
  });

  return (
    <ul>{todos}</ul>
  );  
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h2>My to-do list</h2>
        <AddTodo />
        <Todos />
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));
