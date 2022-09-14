import { Resolvers } from './__generated__/resolvers-types';

// Use our generated Resolvers type to add type checking to all of our
// resolvers!
const resolvers: Resolvers = {
  Query: {
    // Our third argument (`contextValue`) has a type here, so we
    // can check the properties within our resolver's shared context value.
    books: (_, __, { dataSources }) => {
      return dataSources.books;
    },
  },
  Mutation: {
    // Below, we mock adding a new book. Our data set is static for this
    // example, so we won't actually modify our data.
    addBook: (_, { title, author }, { dataSources }) => {
      dataSources.books.push({ title, author });
      console.log(dataSources.books);

      return {
        code: '200',
        success: true,
        message: 'New book added!',
        book: dataSources.books[-1],
      };
    },
  },
};

export default resolvers;
