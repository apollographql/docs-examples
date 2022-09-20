import { Resolvers } from '../__generated__/resolvers-types';
import queries from './queries.js';
import mutations from './mutations.js';

// Note this "Resolvers" type isn't strictly necessary, because we are already separately type check our queries and resolvers. But the "Resolvers" generated types is the syntax you'll use if you are defining your resolvers in a single file.
const resolvers: Resolvers = { ...queries, ...mutations };

export default resolvers;
