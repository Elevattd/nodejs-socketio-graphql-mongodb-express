const { GraphQLID, GraphQLList, GraphQLNonNull } = require("graphql");
const { User } = require("../../models");
const { UserType } = require("../types");

//esto seria como el controller de nuestra api
// const hello = {
//   type: GraphQLString,
//   description: "Return a string",
//   resolve: () => "Hello world",
// };

const users = {
  type: new GraphQLList(UserType),
  resolve: () => User.find(),
};

const user = {
  type: UserType,
  description: "Get a user by id",
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_, { id }) => User.findById(id),
};

module.exports = { users, user };
