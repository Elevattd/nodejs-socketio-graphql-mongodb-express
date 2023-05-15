const {
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLObjectType,
} = require("graphql");

const { User } = require("../models");

const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "This is a user type",
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  description: "This is a product type",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    author: {
      type: UserType,
      async resolve(parent) {
        let user = await User.findById(parent.authorId);
        return user;
      },
    },
  },
});

module.exports = { UserType, ProductType };
