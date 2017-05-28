import { createServer } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import {subscriptionManager, schema} from "./subscriptions";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Init HTTP server and GraphQL Endpoints
const app = express();
app.use('*', cors());
app.use('/graphql', bodyParser.json(), graphqlExpress(request => ({schema})));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
})

// Create WebSocket server
const appWS = createServer((request, response) => {
    response.writeHead(404);
    response.end();
});

appWS.listen(5000, () => {
    console.log(`Websocket listening on port 5000`)
})

const subscriptionServer = new SubscriptionServer({
    onConnect: async(connectionParams) => {
        console.log('WebSocket connection established');
    },
    subscriptionManager: subscriptionManager
}, {
    server: appWS,
    path: '/subscriptions'
})