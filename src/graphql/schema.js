const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const {
  products,
  product,
  productByName,
} = require("./products/productQueries");
const { registrer, login } = require("./user/userMutations");
const { user, users } = require("./user/userQueries");
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./products/productMutation");

//esto seria como la ruta de nuestra api
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "This is a root query type",
  fields: {
    users,
    user,
    products,
    product,
    productByName,
  },
});

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "This is a root mutation type",
  fields: {
    registrer,
    login,
    createProduct,
    updateProduct,
    deleteProduct,
  },
});

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
