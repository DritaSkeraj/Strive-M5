const express = require("express")
const listEndpoints = require("express-list-endpoints")
const productsRouter = require("./services/products")
const {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} = require("./errorHandlers")

const server = express()

const port = process.env.PORT || 3002

server.use(express.json())
server.use("/products", productsRouter)

server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

console.log(listEndpoints(server))

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
