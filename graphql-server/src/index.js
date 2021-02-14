const { ApolloServer } = require('apollo-server')
const jwt = require("jsonwebtoken")
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('../models')

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    if (req && req.headers) {
      const header = req.headers.authorization;

      // not found
      if (!header) return { isAuth: false, models };

      let decodeToken;
      try {
        decodeToken = jwt.verify(header, config.JWT_SECRET);
      } catch (err) {
        return { isAuth: false, models };
      }
      // in case any error found
      if (!!!decodeToken) return { isAuth: false, models };

      // token decoded successfully, and extracted data
      return { isAuth: true, loggedUserId: decodeToken.id, loggedUserName: decodeToken.name, models };
    }
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      if (connectionParams.authorization) {
        const header = connectionParams.authorization;
        // not found
        if (!header) return { isAuth: false, models };

        let decodeToken;
        try {
          decodeToken = jwt.verify(header, config.JWT_SECRET);
        } catch (err) {
          return { isAuth: false, models };
        }
        // in case any error found
        if (!!!decodeToken) return { isAuth: false, models };

        // token decoded successfully, and extracted data
        return { isAuth: true, loggedUserId: decodeToken.id, loggedUserName: decodeToken.name, models };
      }
      throw new Error('Missing auth token!');
    },
    onDisconnect: (webSocket, context) => {
      console.log('Client disconnected')
    },
  },
})

server
  .listen()
  .then(({ url }) => console.log('Server is running on localhost:4000'))
