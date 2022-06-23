import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer, gql } from "apollo-server-express"
import neo4j from "neo4j-driver"
import express from 'express';
import { jwtCheck } from "./src/middleware/authentication.js";
import cors from 'cors'
import { getTypeDefs } from "./src/graphql-schema.js";
import Neo4jGraphQLAuthPlugin from "@neo4j/graphql-plugin-auth";
const port = 4000;
const app = express();

app.use(jwtCheck)

const driver = neo4j.driver(
    "bolt://localhost:11003",
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD),
);

const neoSchema = await new Neo4jGraphQL({ 
    typeDefs : getTypeDefs(), 
    driver ,
    plugins : {
        auth: new Neo4jGraphQLAuthPlugin.Neo4jGraphQLAuthJWKSPlugin({
            rolesPath: 'permissions',
            jwksEndpoint: process.env.AUTH0_JWKSURI,
        })
    }
}).getSchema();

const server = new ApolloServer({ 
    schema: neoSchema,
    cache: "bounded",
    csrfPrevention: true,
    context: ({ req }) => ({ req })
});

await server.start()

const corsOptions = {
    origin : ["http://localhost:8080", "https://studio.apollographql.com"],
    credentials: true
}

app.use(cors(corsOptions))

server.applyMiddleware({app})

app.listen({port}, () => {
    console.log("Online")
})


