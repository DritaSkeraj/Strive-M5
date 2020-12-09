const express = require("express")
const fs = require("fs")
const path = require("path")
const uniqid = require("uniqid")

const router = express.Router()

const readFile = fileName => {
  const buffer = fs.readFileSync(path.join(__dirname, fileName))
  const fileContent = buffer.toString()
  return JSON.parse(fileContent)
}

router.get("/:id/projects", (req, res, next) => {
  try {
    const projectsDB = readFile("projects.json");
    const project = projectsDB.filter(project => project.studentID === req.params.id)
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


module.exports = router
