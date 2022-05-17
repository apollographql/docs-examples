// Import types from our generated types to use in our resolvers.
import { Resolvers, CreateDogMutationResponse, MutationCreateDogArgs, Dog } from "./__generated__/resolvers-types";

// Import the Context type (along with the interface we created named ContextOptions) to ensure our resolver's context is typed correctly.
import { Context } from "apollo-server-core";
import { ContextOptions } from "./datasources";

// Resolver map returning the Resolvers type
export const resolvers: Resolvers = {
  Query: {
    // Ensuring our resolvers return data that matches our Dog type.
    getDogs: (_, __, context: Context<ContextOptions>): Promise<Dog[]> => {
      const dogs = context.dataSources.dogsApi.getDogs();
      return dogs;
    },
  },
  Mutation: {
    createDog: async (_, args: MutationCreateDogArgs, context: Context<ContextOptions>): Promise<CreateDogMutationResponse> => {
      // Create a new dog after destructuring our passed in arguments
      const { name, age, breed }: { name: string; age: number; breed: string } = args.dogInfo;
      const newDog = await context.dataSources.dogsApi.createDog(name, age, breed);

      // Ensure our return data matches the CreateDogMutationResponse type
      return { code: 200, message: "Dog Created!", success: true, dog: newDog } as CreateDogMutationResponse;
    },
  },
};
