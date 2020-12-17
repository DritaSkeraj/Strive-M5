const express = require("express");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");
const booksRouter = require("./services/books");

const server = express();

const port = process.env.PORT || 3000;

const whitelist = [process.env.FE_URL_PROD, process.env.FE_URL_DEV,]

server.use(
  cors({
    origin: function()
  })
);
server.use(express.json());
server.use("/books");
console.log(listEndpoints(server));

server.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    console.log("server is running on port ", port);
  } else {
    console.log("Server is listening locally on port ", port);
  }
});
