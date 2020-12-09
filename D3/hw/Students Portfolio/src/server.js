const express = require("express")
const listEndpoints = require("express-list-endpoints")
const studentsRoute = require("./services/students")
const projectsRouter = require("./services/projects")
const studentProjectsRoute = require("./services/students");
const {
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
} = require("./errorHandling")

const server = express()

const port = process.env.PORT || 3002

const loggerMiddleware = (req, res, next) => {
  console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`)
  next()
}

server.use(express.json())
server.use(loggerMiddleware)

server.use("/students", studentsRoute)
server.use("/projects", projectsRouter)
server.use("/students", studentProjectsRoute)

// ERROR HANDLERS

server.use(notFoundHandler)
server.use(unauthorizedHandler)
server.use(forbiddenHandler)
server.use(catchAllHandler)

console.log("listEndpoints(server) => ", listEndpoints(server))

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
