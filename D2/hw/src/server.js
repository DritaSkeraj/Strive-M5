const express = require("express")
const cors = require("cors")
const usersRoutes = require("./services/students")

const server = express()

const port = 3003

server.use(cors())
// I need to specify this line of code otherwise all the request bodies will be undefined. 
//And this line of code must come BEFORE the routes
server.use(express.json()) 

server.use("/students", usersRoutes)

server.listen(port, () => {
  console.log("Server is running on port: ", port)
})
