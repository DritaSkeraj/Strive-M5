const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")

const { check, validationResult } = require("express-validator")

const router = express.Router()

const readFile = fileName => {
  const buffer = fs.readFileSync(path.join(__dirname, fileName))
  const fileContent = buffer.toString()
  return JSON.parse(fileContent)
}

router.get("/:id", (req, res, next) => {
  try {
    const usersDB = readFile("users.json")
    const user = usersDB.filter(user => user.ID === req.params.id)
    if (user.length > 0) {
      res.send(user)
    } else {
      const err = new Error()
      err.httpStatusCode = 404
      next(err)
    }
  } catch (error) {
    next(error)
  }
})

router.get("/", (req, res, next) => {
  try {
    const usersDB = readFile("users.json")
    if (req.query && req.query.name) {
      const filteredUsers = usersDB.filter(
        user =>
          user.hasOwnProperty("name") &&
          user.name.toLowerCase() === req.query.name.toLowerCase()
      )
      res.send(filteredUsers)
    } else {
      res.send(usersDB)
    }
  } catch (error) {
    next(error)
  }
})

router.post(
  "/",
  [
    check("name")
      .isLength({ min: 4 })
      .withMessage("No way! Name too short!")
      .exists()
      .withMessage("Insert a name please!"),
  ],
  (req, res, next) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const err = new Error()
        err.message = errors
        err.httpStatusCode = 400
        next(err)
      } else {
        const usersDB = readFile("users.json")
        const newUser = {
          ...req.body,
          ID: uniqid(),
          modifiedAt: new Date(),
        }

        usersDB.push(newUser)

        fs.writeFileSync(
          path.join(__dirname, "users.json"),
          JSON.stringify(usersDB)
        )

        res.status(201).send({ id: newUser.ID })
      }
    } catch (error) {
      next(error)
    }
  }
)

router.delete("/:id", (req, res, next) => {
  try {
    const usersDB = readFile("users.json")
    const newDb = usersDB.filter(user => user.ID !== req.params.id)
    fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(newDb))

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

router.put("/:id", (req, res, next) => {
  try {
    const usersDB = readFile("users.json")
    const newDb = usersDB.filter(user => user.ID !== req.params.id)

    const modifiedUser = {
      ...req.body,
      ID: req.params.id,
      modifiedAt: new Date(),
    }

    newDb.push(modifiedUser)
    fs.writeFileSync(path.join(__dirname, "users.json"), JSON.stringify(newDb))

    res.send({ id: modifiedUser.ID })
  } catch (error) {
    next(error)
  }
})

module.exports = router
