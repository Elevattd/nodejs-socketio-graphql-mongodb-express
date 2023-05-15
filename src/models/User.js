//Schema -> define que estoy guarando en la base de datos.
//model -> define que estoy usando para interactuar ese esquema.
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
    //Mongose añade un __v: para quitar eso se pone asi...↓
    versionKey: false,
  }
);

module.exports = model("User", userSchema);
