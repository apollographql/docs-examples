import {
  graphql,
  print,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLError,
} from "graphql";
import { ApolloLink, Observable } from "@apollo/client";

const DogType = new GraphQLObjectType({
  name: "Dog",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    breed: { type: GraphQLString },
  },
});

const BreedType = new GraphQLObjectType({
  name: "Breed",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    characteristics: { type: new GraphQLList(GraphQLString) },
  },
});

let dogData = [
  { id: "1", name: "Buck", breed: "bulldog" },
  { id: "2", name: "Blueberry", breed: "poodle" },
  { id: "3", name: "Mozzarella", breed: "corgi" },
];

let breedData = [
  {
    id: "25",
    name: "bulldog",
    characteristics: ["kind", "courageous", "dignified"],
  },
  { id: "26", name: "poodle", characteristics: ["lively", "fun", "active"] },
  {
    id: "27",
    name: "corgi",
    characteristics: ["intelligent", "happy", "independent"],
  },
];

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    dogs: {
      type: new GraphQLList(DogType),
      resolve: () => dogData,
    },
    breeds: {
      type: new GraphQLList(BreedType),
      resolve: async () => {
        await delay(300);
        return breedData;
      },
    },
    dog: {
      type: DogType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: async (_, { id }) => {
        // await delay(300);
        const findDogByName = dogData.find(
          (dog) => dog.id.toLowerCase() === id.toLowerCase()
        );
        if (!id || !findDogByName) return dogData[0];
        return findDogByName;
      },
      // resolve: () => {
      //   return new GraphQLError("Error! Something went wrong.");
      // },
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    deleteDog: {
      type: DogType,
      args: {
        name: { type: GraphQLString },
      },
      resolve: function (_, { name }) {
        const result = dogData.filter(
          (dog) => dog.name.toLowerCase() !== name.toLowerCase()
        );
        return (dogData = result);
      },
    },
  },
});

const schema = new GraphQLSchema({ query: QueryType, mutation: MutationType });

function delay(wait: number) {
  return new Promise((resolve) => setTimeout(resolve, wait));
}

export const link = new ApolloLink((operation) => {
  // @ts-expect-error
  return new Observable(async (observer) => {
    const { query, operationName, variables } = operation;
    try {
      const result = await graphql({
        schema,
        source: print(query),
        variableValues: variables,
        operationName,
      });
      observer.next(result);
      observer.complete();
    } catch (err) {
      observer.error(err);
    }
  });
});
