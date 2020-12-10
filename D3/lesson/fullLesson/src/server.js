const express = require("express")
const listEndpoints = require("express-list-endpoints")
const usersRoutes = require("./services/users")
const moviesRoutes = require("./services/movies")

const server = express()

const port = process.env.PORT || 3001

server.use(express.json())

server.use("/users", usersRoutes);
server.use("./movie", moviesRoutes);

console.log(listEndpoints(server))

server.listen(port, () => console.log("Server running on port ", port))