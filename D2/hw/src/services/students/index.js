/*

GET /students => returns the list of students
GET /students/123 => returns a single student
POST /students => create a new student
PUT /students/123 => edit the student with the given id
DELETE /students/123 => delete the student with the given id

Student should have this information:
    - Name
    - Surname
    - ID
    - Email
    - Date of Birth
    //BACKEND
*/

const express = require("express") 
const fs = require("fs") 
const path = require("path") 
const uniqid = require("uniqid") 

const router = express.Router()

// 1.router.get("/")

router.get("/", (req, res) => {

  const usersFilePath = path.join(__dirname, "students.json")
  // a) Retrieve the list from a file on disk (users.json)
  const fileAsABuffer = fs.readFileSync(usersFilePath) // returns a buffer (machine readable, not human readable)!!!
  // b) we get a buffer so this must be converted to something readable (like a String)
  const fileAsAString = fileAsABuffer.toString()
  // c) I want to send the list as a response but in the form of a JSON (not a String)

  const usersArray = JSON.parse(fileAsAString)

  res.send(usersArray)
})

// 2. router.get("/:id")
router.get("/:identifier", (req, res) => {

  // 1. read the content from the file
  const usersFilePath = path.join(__dirname, "students.json")
  const fileAsABuffer = fs.readFileSync(usersFilePath)
  const fileAsAString = fileAsABuffer.toString()
  const usersArray = JSON.parse(fileAsAString)

  // 2. grab the id from the url
  const idComingFromRequest = req.params.identifier
  console.log("---------------->", idComingFromRequest)

  // 3. filter the array searching for that id
  const user = usersArray.filter(user => user.ID === idComingFromRequest)
  console.log("Student ", user)
  res.send(user)
})

// 3. router.post("/")

router.post("/", (req, res) => {

  // 1. read the old content from the file
  const usersFilePath = path.join(__dirname, "students.json")
  const fileAsABuffer = fs.readFileSync(usersFilePath)
  const fileAsAString = fileAsABuffer.toString()
  const usersArray = JSON.parse(fileAsAString)

  //check if there are other emails like his
  const newUser = req.body
  console.log("email:",  newUser.email);
  const emailExists = usersArray.filter(user => user.email === newUser.email);
  console.log("email exists: ", emailExists);

  // 2. push new user to usersArray
  if(emailExists.length > 0){
    console.log("email already exists");
    res.status(300).send("This email already exists, you should try a new one.");
  }else{
    console.log("cool email, push it in the json file");
    newUser.ID = uniqid()
    usersArray.push(newUser)
    fs.writeFileSync(usersFilePath, JSON.stringify(usersArray))
    res.status(201).send({ email: newUser.email })
  }

})

// 4. router.put("/:id")

router.put("/:id", (req, res) => {
  // handler

  // 1. Read the file
  const usersFilePath = path.join(__dirname, "students.json")
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
  const usersFilePath = path.join(__dirname, "students.json")
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
