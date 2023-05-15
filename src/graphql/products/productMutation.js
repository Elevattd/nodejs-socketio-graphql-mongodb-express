const { GraphQLString, GraphQLInt, GraphQLID } = require("graphql");
const { Product } = require("../../models");
const { ProductType } = require("../../graphql/types");

const createProduct = {
  type: ProductType,
  description: "Create a new product",
  args: {
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
  },
  //  resolve : async(_, args, { verifiedUser }) => {
  resolve: async (_, args) => {
    const { name, image, description, price } = args;
    try {
      const product = new Product({
        name,
        image,
        description,
        price,
        // authorId: verifiedUser._id,
      }).save();

      return product;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const updateProduct = {
  type: ProductType,
  description: "Update a product",
  args: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLInt },
  },
  // resolve: async (_, { id, name, image, description, price }, { verifiedUser }) => {
  resolve: async (_, { id, name, image, description, price }) =>
    // { verifiedUser }
    {
      let product;
      // !verifiedUser
      //   ? new Error("Unauthorized")
      //   : (
      product = await Product.findOneAndUpdate(
        { _id: id },
        { name, image, description, price },
        { new: true, runValidators: true }
      );
      // );
      return product;
    },
};

const deleteProduct = {
  type: ProductType,
  description: "Delete a product",
  args: {
    productId: { type: GraphQLID },
  },
  // resolve: async (_, { productId }, { verifiedUser }) => {
  resolve: async (_, { productId }) => {
    let product;
    // !verifiedUser
    // ? new Error("Unauthorized")
    // : (
    product = await Product.findOneAndDelete({
      _id: productId,
      // authorId: verifiedUser._id,
    });
    // );

    if (!product) throw new Error("Product not found");
    return product;
  },
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};
