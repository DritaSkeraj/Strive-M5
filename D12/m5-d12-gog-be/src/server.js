const express = require("express")
require("dotenv").config()
const listEndpoints = require("express-list-endpoints")
const {
    notFoundHandler,
    unauthorizedHandler,
    forbiddenHandler,
    badRequestHandler,
    catchAllHandler,
  } = require("./errorHandling")

const gamesRouter = require("./services/games")
const cartRouter = require("./services/cart")

const server = express()

server.use(express.json())

server.get("/", (req, res, next) => res.send("Server is running..."))
server.use("/games", gamesRouter)
server.use("/cart", cartRouter)

const port = process.env.PORT || 3001

server.use(notFoundHandler)
server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(badRequestHandler)
server.use(catchAllHandler)

console.log(listEndpoints(server))

server.listen(port, ()=> console.log("Server is running on port: " + port))