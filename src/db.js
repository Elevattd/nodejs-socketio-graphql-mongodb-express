const mongoose = require("mongoose");
const { DB_PORT, MONGODB_URI } = require("../config");

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`LOAD DB      --> ON: ${DB_PORT}`);
  } catch (error) {
    console.log("error:", error);
  }
};

module.exports = {
  connect,
};
