const express = require("express")
const cors = require("cors")
const listEndpoints = require("express-list-endpoints")
const helmet = require("helmet")
const yaml = require("yamljs")
const swaggerUI = require("swagger-ui-express")
const { join } = require("path")

const booksRoutes = require("./services/books")
const usersRoutes = require("./services/users")
const filesRoutes = require("./services/files")
const xmlRouter = require("./services/xml")

const {
  notFoundHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("./errorHandlers")

const server = express()

const port = process.env.PORT || 3001 // the fallback is for local development, heroku will use his own port, something like 12312, because imagine how many processes are running on the same machine there

server.use(express.json())

const whiteList =
  process.env.NODE_ENV === "production"
    ? [process.env.FE_URL_PROD]
    : [process.env.FE_URL_DEV]

const corsOptions =
  process.env.NODE_ENV === "production"
    ? {
        origin: function (origin, callback) {
          if (whiteList.indexOf(origin) !== -1) {
            // allowed
            callback(null, true)
          } else {
            // Not allowed
            callback(new Error("NOT ALLOWED - CORS ISSUES"))
          }
        },
      }
    : {}

server.use(helmet())
server.use(cors(corsOptions)) // CROSS ORIGIN RESOURCE SHARING

//ROUTES
const swaggerDoc = yaml.load(join(__dirname, "apiDocs.yml"))

server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc))
server.use("/books", booksRoutes)
server.use("/users", usersRoutes)
server.use("/files", filesRoutes)
server.use("/xml", xmlRouter)

// ERROR HANDLERS
server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)

console.log(listEndpoints(server))

server.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    console.log("Running on cloud on port", port)
  } else {
    console.log("Running locally on port", port)
  }
})
