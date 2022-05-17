import { RESTDataSource } from "apollo-datasource-rest";
// Import our generated Dog type.
import { Dog } from "../__generated__/resolvers-types";

let exampleDogs = [
  { id: "dog-01", name: "Clifford", age: 6, breed: "Best Boi" },
  { id: "dog-02", name: "Lentil", age: 7, breed: "Small and strong" },
  { id: "dog-03", name: "Barley", age: 7, breed: "Racoon" },
  { id: "dog-04", name: "Jet", age: 7, breed: "Totally not a cat" },
  { id: "dog-05", name: "Piglet", age: 2, breed: "Boston Terrier" },
];

//  We use mostly mocked data in this example app, but we do fetch fun images for each dog.
export class DogsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.thedogapi.com/v1/images";
  }

  async getDogs() {
    // After you run this the first time Apollo Server will cache the results
    // so subsequent runs may not re-run this query for new photos.
    const dogsWithPhotos: Dog[] = await this.fetchDogsPhotos(exampleDogs);
    return dogsWithPhotos;
  }

  async fetchDogsPhotos(dogs) {
    // Fetch 5 photos for our 5 example dogs
    let photosResponse = await this.get(`/search?size=med&mime_types=jpg&format=json&order=RANDOM&page=0&limit=5`);
    for (let index = 0; index < dogs.length; index++) {
      const dog = dogs[index];
      dog["image"] = photosResponse[index].url;
    }
    return dogs;
  }

  async createDog(name: string, age: number, breed: string) {
    //  This line of code grabs the last "id" from our example data above and increments it for our new dog's id.
    const newId = parseInt(exampleDogs.pop()["id"].slice(-1)) + 1;

    // Get our picture for our new dog
    const response = await this.get("/search?size=med&mime_types=jpg&format=json&order=RANDOM&page=0&limit=1");
    const newImage: string = response[0].url;
    const newDog = { id: `dog-0${newId}`, name, age, breed, image: newImage };
    return newDog as Dog;
  }
}
