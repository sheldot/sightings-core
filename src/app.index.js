import 'app-module-path/cwd';
import 'src/util/env.util';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { resolvers, typeDefs } from 'src/nodes/_.nodes';
import db from 'src/tables/_.tables';

// Connect the environment variables
const port = (process.env.NODE_ENV === 'prod') ? process.env.PROD_PORT : process.env.DEV_PORT;
const path = (process.env.NODE_ENV === 'prod') ? process.env.PROD_PATH : process.env.DEV_PATH;

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    db,
    SECRET: (process.env.NODE_ENV === 'prod') ? process.env.PROD_SECRET : process.env.DEV_SECRET,
  },
  playground: {
    endpoint: path,
    settings: {
      'editor.theme': 'light',
      'schema.polling.enable': false,
    },
  },
});

const app = express();
graphqlServer.applyMiddleware({ app, path });

db.sequelize.sync().then(() => {
  app.listen({ port }, () => {
    console.log(`\n🚀 We are live: http://localhost:${port}${graphqlServer.graphqlPath}`);
  });

  // Setting up a socket connection
  // const io = require('socket.io').listen(server);
  // io.sockets.on('connection', function (socket) {
  // });
});
