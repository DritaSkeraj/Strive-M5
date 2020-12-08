/*

1. get all users on url --> localhost:3001/users/
2. get single user on url --> localhost:3001/users/:id
3. create a single user --> localhost:3001/users
4. modify a single user --> localhost:3001/users/:id
5. delete a single user --> localhost:3001/users/:id

All the routes in this file will have the /users/ prefix
*/

const express = require("express") // third party module
const fs = require("fs") // core module
const path = require("path") // core module
const uniqid = require("uniqid") // third party module

const router = express.Router()

// 1.router.get("/")

router.get("/", (req, res) => {
  // handler
  // console.log(__dirname) // current directory
  // console.log(path.join(__dirname, "users.json")) // this is the correct way to concatenate two paths
  // console.log(__dirname + "\\users.json") // Do not concatenate paths in this way, use path.join()
  const usersFilePath = path.join(__dirname, "users.json")
  // a) Retrieve the list from a file on disk (users.json), because we don't have a real database yet!
  const fileAsABuffer = fs.readFileSync(usersFilePath) // returns a buffer (machine readable, not human readable)!!!
  // b) we get a buffer so this must be converted to something readable (like a String)
  const fileAsAString = fileAsABuffer.toString()
  // c) I want to send the list as a response but in the form of a JSON (not a String)

  const usersArray = JSON.parse(fileAsAString)

  // d) Now I can finally send it as a response
  res.send(usersArray)
})

// 2. router.get("/:id")

router.get("/:identifier", (req, res) => {
  // handler

  // 1. read the content from the file
  const usersFilePath = path.join(__dirname, "users.json")
  const fileAsABuffer = fs.readFileSync(usersFilePath)
  const fileAsAString = fileAsABuffer.toString()
  const usersArray = JSON.parse(fileAsAString)

  // 2. grab the id from the url
  const idComingFromRequest = req.params.identifier
  console.log("---------------->", idComingFromRequest)

  // 3. filter the array searching for that id
  const user = usersArray.filter(user => user.ID === idComingFromRequest)
  console.log("USER ", user)

  // 4. send the found user back as a response
  res.send(user)
})

// 3. router.post("/")

router.post("/", (req, res) => {
  // handler

  // 1. read the old content from the file
  const usersFilePath = path.join(__dirname, "users.json")
  const fileAsABuffer = fs.readFileSync(usersFilePath)
  const fileAsAString = fileAsABuffer.toString()
  const usersArray = JSON.parse(fileAsAString)

  // 2. push new user to usersArray

  // 2.1 let's create a unique identifier for him

  const newUser = req.body
  newUser.ID = uniqid()
  console.log(newUser)
  usersArray.push(newUser)
  console.log(usersArray)

  // 3. replace old content in the file with new array

  fs.writeFileSync(usersFilePath, JSON.stringify(usersArray))

  res.status(201).send({ id: newUser.ID })
})

// 4. router.put("/:id")

router.put("/:id", (req, res) => {
  // handler

  // 1. Read the file
  const usersFilePath = path.join(__dirname, "users.json")
  const fileAsABuffer = fs.readFileSync(usersFilePath)
  const fileAsAString = fileAsABuffer.toString()
  const usersArray = JSON.parse(fileAsAString)

  // 2. Filter out the user with the specified id
  const newUsersArray = usersArray.filter(user => user.ID !== req.params.id)

  // 3. Create the modifiedUser object taking data from the request body

  const modifiedUser = req.body
  modifiedUser.ID = req.params.id

  // 4. Add the modified user back to the array
  newUsersArray.push(modifiedUser)

  // 5. Write it back on disk

  fs.writeFileSync(usersFilePath, JSON.stringify(newUsersArray))
  res.send("Modify user route")
})

// 5. router.delete("/:id")

router.delete("/:id", (req, res) => {
  // handler

  // 1. Read the file
  const usersFilePath = path.join(__dirname, "users.json")
  const fileAsABuffer = fs.readFileSync(usersFilePath)
  const fileAsAString = fileAsABuffer.toString()
  const usersArray = JSON.parse(fileAsAString)

  // 2. Filter out the user with the specified id
  const newUsersArray = usersArray.filter(user => user.ID !== req.params.id)

  // 3. Save it back on disk

  fs.writeFileSync(usersFilePath, JSON.stringify(newUsersArray))

  res.status(204).send()
})

module.exports = router
