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
    const projectsDB = readFile("projects.json")
    const project = projectsDB.filter(project => project.ID === req.params.id)
    if (project.length > 0) {
      res.send(project)
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
    const projectsDB = readFile("projects.json")
    if (req.query && req.query.name) {
      const filteredProjects = projectsDB.filter(
        project =>
          project.hasOwnProperty("name") &&
          project.name.toLowerCase() === req.query.name.toLowerCase()
      )
      res.send(filteredProjects)
    } else {
      res.send(projectsDB)
    }
  } catch (error) {
    next(error)
  }
})

router.post(
  "/",
  [
    check("name")
      .exists()
      .withMessage("Insert a name please!"),
    check("description")
      .exists()
      .withMessage("Provide a description please!"),
    check('repoURL')
      .exists()
      .withMessage('Provide the URL of the project')
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
        const usersDB = readFile("projects.json")
        const newUser = {
          ...req.body,
          ID: uniqid(),
          modifiedAt: new Date(),
        }

        usersDB.push(newUser)

        fs.writeFileSync(
          path.join(__dirname, "projects.json"),
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
    const usersDB = readFile("projects.json")
    const newDb = usersDB.filter(user => user.ID !== req.params.id)
    fs.writeFileSync(path.join(__dirname, "projects.json"), JSON.stringify(newDb))

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

router.put("/:id", (req, res, next) => {
  try {
    const usersDB = readFile("projects.json")
    const newDb = usersDB.filter(user => user.ID !== req.params.id)

    const modifiedUser = {
      ...req.body,
      ID: req.params.id,
      modifiedAt: new Date(),
    }

    newDb.push(modifiedUser)
    fs.writeFileSync(path.join(__dirname, "projects.json"), JSON.stringify(newDb))

    res.send({ id: modifiedUser.ID })
  } catch (error) {
    next(error)
  }
})

module.exports = router
