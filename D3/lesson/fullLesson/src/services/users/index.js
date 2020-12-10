const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqid = require("uniqid");

const router = express.Router();

const readFile = (fileName) => {
  const buf = fs.readFileSync(path.join(__dirname, fileName));
  const content = buf.toString();
  return JSON.parse(content);
};

router.get("/", (req, res) => {
  const users = readFile("users.json");
  console.log(req.query); //https:localhost:3001/users?name=Whatever
  if (req.query && req.query.name) {
    const filteredUsers = users.filter(
        (user) => 
        //we can do this with user.name but we're not doing that
        //'cause what if name is a boolean value user.name would be true/false based on names value
        user.hasOwnProperty("name") && user.name === req.query.name);
        req.send(filteredUsers)
  } else{
      res.send(users);
  }
  
});

router.get("/:id", (req, res) => {
  const users = readFile("users.json");
  const selectedUser = users.filter(user => user.ID ===  req.params.id);
  res.send(selectedUser)
});

router.post("/", (req, res) => {
  const users = readFile("users.json");
  const newUser = {
      ...req.body,
      ID: uniqid(),
      addedAt: new Date()
  }

  users.push(newUser);
  fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(users));
  res.status(201).send({id: newUser.ID});
});

router.put("/:id", (req, res) => {
  const users = readFile("users.json");
  const newUsers = users.filter(user => user.ID !== req.params.id)

  const modifiedUser = {
      ...req.body,
      ID: req.params.id,
      modifiedAt: new Date()
  }

  newUsers.push(modifiedUser);
  fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(newUsers));
  res.send({id: modifiedUser.ID});
});

router.delete("/:id", (req, res) => {
  const users = readFile("users.json");
  const newUsers = users.filter(user => user.ID !== req.params.id);
  fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(newUsers));
  res.status(204).send()
});

module.exports = router;
