const express = require("express")
const { join } = require("path")
const explore = require("./explore-folder")

const filesRoutes = express.Router()

filesRoutes.get("/", async (req, res, next) => {
  try {
    const files = await explore(join(__dirname, "../../../"))

    res.send(files)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = filesRoutes
