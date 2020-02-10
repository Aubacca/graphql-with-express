const express = require("express");
const expressGraphql = require("express-graphql");
const { buildSchema } = require("graphql");

// Load application data.
var userList = require("./data/users");

// Application settings.
const PORT_NUMER = 8080;
const ROUTER_ROOT = "/app/v1/graphql";

// GraphQL schema.
const schema = buildSchema(`
type Query {
    message: String,
    user(id: Int): User,
    users: [User]
}
type Mutation {
    updateUserName(id: Int!, name: String!): User
}
type User {
    id: Int,
    name: String,
    username: String,
    email: String,
    phone: String,
    website: String,
    address: Address,
}
type Address {
    street: String,
    suite: String,
    city: String,
    zipcode: String
}
`);

// Get user by id.
const getUser = args => {
  return userList.find(user => user.id === args.id);
};

// Update name of one user by id.
const updateUserName = args => {
  userList = userList.map(user => {
    if (user.id === args.id) {
      user.name = args.name;
    }
    return user;
  });
  return getUser(args);
};

// Root provider
const root = {
  message: () => "Welcome to Express and Express-GraphQL!",
  user: getUser,
  users: userList,
  updateUserName: updateUserName
};

// Setting up expess server.
const app = express();

// Add middleware.
app.use(
  ROUTER_ROOT,
  expressGraphql({
    schema,
    rootValue: root,
    graphiql: true
  })
);

// Start express server.
app.listen(PORT_NUMER, () => {
  console.log(
    `Express GraphQL is listening on http://localhost:${PORT_NUMER}${ROUTER_ROOT}`
  );
});
