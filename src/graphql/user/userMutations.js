const { GraphQLString, GraphQLInt, GraphQLID } = require("graphql");
const { User } = require("../../models");
const { generateAccessToken, updateRefreshToken } = require("../../utils/auth");
const bcrypt = require("bcrypt");

const registrer = {
  type: GraphQLString,
  description: "Register a new user and return a token",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { username, email } = args;
    const password = await bcrypt.hash(args.password, 10);
    try {
      const user = new User({ username, email, password });
      await user.save();
      const accessToken = generateAccessToken({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
      return accessToken;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const login = {
  type: GraphQLString,
  description: "Login a user and return a token",
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { email, password } = args;
    try {
      let accessToken;
      const user = await User.findOne({ email }).select("+password");
      !user || !(await bcrypt.compare(password, user.password))
        ? new Error("Invalid credentials")
        : (accessToken = generateAccessToken(user));

      return accessToken;
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = {
  registrer,
  login,
};
