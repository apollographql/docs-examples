import { DogsAPI } from "./DogsAPI";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";

// This interface specifies what is available in our context. As our application grows, we could add additional data sources or HTTP request headers as needed.
export interface ContextOptions {
  dataSources: { dogsApi: DogsAPI };
}

// Using the ContextOptions interface above, we can initialize our context.
export const initialContext: DataSources<ContextOptions> = {
  dogsApi: new DogsAPI(),
};
