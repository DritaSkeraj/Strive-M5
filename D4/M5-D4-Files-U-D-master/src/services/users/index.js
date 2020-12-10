const express = require("express")
const path = require("path")
const uniqid = require("uniqid")
const { readDB, writeDB } = require("../../lib/utilities")

const { check, validationResult } = require("express-validator")

const router = express.Router()

const usersFilePath = path.join(__dirname, "users.json")

router.get("/:id", async (req, res, next) => {
  try {
    const usersDB = await readDB(usersFilePath)
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

router.get("/", async (req, res, next) => {
  try {
    const usersDB = await readDB(usersFilePath)
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
  async (req, res, next) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        const err = new Error()
        err.message = errors
        err.httpStatusCode = 400
        next(err)
      } else {
        const usersDB = await readDB(usersFilePath)
        const newUser = {
          ...req.body,
          ID: uniqid(),
          modifiedAt: new Date(),
        }

        usersDB.push(newUser)

        await writeDB(usersFilePath, usersDB)

        res.status(201).send({ id: newUser.ID })
      }
    } catch (error) {
      next(error)
    }
  }
)

router.delete("/:id", async (req, res, next) => {
  try {
    const usersDB = await readDB(usersFilePath)
    const newDb = usersDB.filter(user => user.ID !== req.params.id)
    await writeDB(usersFilePath, newDb)

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const usersDB = await readDB(usersFilePath)
    const newDb = usersDB.filter(user => user.ID !== req.params.id)

    const modifiedUser = {
      ...req.body,
      ID: req.params.id,
      modifiedAt: new Date(),
    }

    newDb.push(modifiedUser)
    await writeDB(usersFilePath, newDb)

    res.send({ id: modifiedUser.ID })
  } catch (error) {
    next(error)
  }
})

module.exports = router
