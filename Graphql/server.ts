import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4"; 
import { json as expressJson } from "express";
import cookieParser from "cookie-parser";
import { typeDefs } from "./schema/typesdef";
import { resolvers } from "./resolver/resolver";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(expressJson());
app.use(cookieParser());

// Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

async function start() {
  try {
    console.log("Starting GraphQL server");
    await server.start();

    app.use("/graphql", expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    }));

    const mongoUri = process.env.MONGO_URI;
    if (mongoUri) {
      await mongoose.connect(mongoUri);
      console.log("MongoDB connected");
    } else {
      console.warn("MONGO_URI not set; skipping DB connection");
    }

    const PORT = process.env.PORT || 4100;
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
