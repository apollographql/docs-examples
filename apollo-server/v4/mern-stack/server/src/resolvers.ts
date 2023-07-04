import db from "./db/conn.js";
import { ObjectId } from "mongodb";

const resolvers = {
  Query: {
    async record(_, { id }, context) {
      let collection = await db.collection("records");
      let query = {_id: new ObjectId(id)};

      return await collection.findOne(query);
    },
    async records(_,__,context) {
      let collection = await db.collection("records");
      return await collection.find({}).toArray();
    }
  },
  Mutation: {
    async createRecord(_, { name, position, level }, context) {
      let collection = await db.collection("records");
      return await collection.insertOne({ name, position, level });
    }
  }
}

export default resolvers;