import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer, gql } from "apollo-server-express"
import neo4j from "neo4j-driver"
import fs from 'fs'
import path from 'path'
import express from 'express';
import { jwtCheck } from "./src/authentication/authentication.js";

const port = 4000;
const app = express();

app.use(jwtCheck)

const getTypeDefs = () => {
    const schemaPath = "./src/schemas"
    const schemaFiles = ["USER", "SKILL"]
    const schemaExtension = [".graphql"]

    let schemas = []
    for(let schemaFile of schemaFiles) {
        schemas.push(fs.readFileSync(path.resolve(schemaPath, schemaFile + schemaExtension)).toString())
    }

    return schemas
}

const driver = neo4j.driver(
    "bolt://localhost:11003",
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD)
);

const neoSchema = await new Neo4jGraphQL({ typeDefs : getTypeDefs(), driver }).getSchema();

const server = new ApolloServer({ 
    schema: neoSchema,
    origin : ["http://localhost:8080"]
});

await server.start()

server.applyMiddleware({app})

app.listen({port}, () => {
    console.log("Online")
})


