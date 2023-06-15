// Use our automatically generated Book and AddBookMutationResponse types
// for type safety in our data source class
import { AddBookMutationResponse, Book } from "./__generated__/resolvers-types";

const BooksDB: Omit<Required<Book>, "__typename">[] = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export class BooksDataSource {
  getBooks(): Book[] {
    // simulate fetching a list of books
    return BooksDB;
  }

  // We are using a static data set for this small example, but normally
  // this Mutation would *mutate* our underlying data using a database
  // or a REST API.
  async addBook(book: Book): Promise<AddBookMutationResponse> {
    if (book.title && book.author) {
      BooksDB.push({ title: book.title, author: book.author });

      return {
        code: "200",
        success: true,
        message: "New book added!",
        book,
      };
    } else {
      return {
        code: "400",
        success: false,
        message: "Invalid input",
        book: null,
      };
    }
  }
}
