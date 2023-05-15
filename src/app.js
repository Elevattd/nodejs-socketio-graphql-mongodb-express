const express = require("express");
const { connect } = require("./db");
const cors = require("cors");
const morgan = require("morgan");

const { handleError } = require("./middlewares/handleError");
const { notFound } = require("./middlewares/notFound");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
// const { authenticate } = require("./middlewares/auth");
const { CORS } = require("../config");
const { getProducts } = require("./controllers/products");
const router = require("./routes");

connect();
const app = express();

// app.use(authenticate);

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.use(
  cors({
    origin: CORS,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "authorization",
    ],
  })
);

app.use("/api", router);

//middlewares
app.use(notFound);
app.use(handleError);

getProducts();

module.exports = app;
