import { ApolloServer } from "npm:@apollo/server";
import { startStandaloneServer } from "npm:@apollo/server/standalone";
import { schema } from "./schema.ts";
import { resolvers } from "./resolvers.ts";
import { MongoClient } from "mongodb";
import { vueloModel } from "./tps.ts";

const MONGO_URL = "mongodb+srv://examen:nebrija@cluster0.h7shi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


if (!MONGO_URL) {
  throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("AD");
const flightCollection = mongoDB.collection<vueloModel>("vuelos");

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ flights: flightCollection }), //El contexto debe tener los mismos nombres en el resolver
});


console.info(`Server ready at ${url}`);