const {
  GraphQLID,

  GraphQLList,
  GraphQLString,
} = require("graphql");

const { Product } = require("../../models");
const { ProductType } = require("../types");

const products = {
  type: new GraphQLList(ProductType),
  description: "Get all products",
  resolve: () => Product.find(),
};

const product = {
  type: ProductType,
  description: "Get a product by id",
  args: {
    id: { type: GraphQLID },
  },
  resolve: (_, { id }) => Product.findById(id),
};

const productByName = {
  type: ProductType,
  description: "Get a product by name",
  args: {
    name: { type: GraphQLString },
  },
  resolve: async (_, { name }) =>
    await Product.find({ name: { $regex: name, $options: "i" } }),
};

module.exports = { products, product, productByName };
