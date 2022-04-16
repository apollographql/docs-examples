import { Resolvers, AddDogMutationResponse, MutationAddDogArgs } from "./__generated__/resolvers-types";
import { Dog } from "./models/Dog";
import { Context } from "apollo-server-core";
import { dogs } from "./datasources/dogExamples.json";

// Resolver map
export const resolvers: Resolvers<Context> = {
  Query: {
    getDogs: (): Dog[] => {
      return dogs;
    },
  },
  Mutation: {
    addDog: async (_, args: MutationAddDogArgs, context: Context): Promise<AddDogMutationResponse> => {
      // extra destructuring just to be clear on what is happening here
      const { name, age, breed }: { name: string; age: number; breed: string } = args.dogInfo;

      // For the purposes of this simple example we do not have a formal database. This line of code grabs the last id from our example data for our new dog.
      const newId = parseInt(dogs.pop()["id"].slice(-1)) + 1;
      const newDog = { id: `dog-0${newId}`, name, age, breed };

      return { code: 200, message: "Dog Added!", success: true, dog: newDog } as AddDogMutationResponse;
    },
  },
};
