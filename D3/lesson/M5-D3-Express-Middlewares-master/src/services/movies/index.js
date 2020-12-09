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

router.get("/:id", (req, res) => {
  const moviesDB = readFile("movies.json")
  const movie = moviesDB.filter(movie => movie.ID === req.params.id)
  res.send(movie)
})

router.get("/", (req, res) => {
  const moviesDB = readFile("movies.json")
  if (req.query && req.query.name) {
    const filteredMovies = moviesDB.filter(
      movie =>
        movie.hasOwnProperty("title") &&
        movie.name.toLowerCase() === req.query.name.toLowerCase()
    )
    res.send(filteredMovies)
  } else {
    res.send(moviesDB)
  }
})

router.post("/", (req, res) => {
  const moviesDB = readFile("movies.json")
  const newMovie = {
    ...req.body,
    ID: uniqid(),
    modifiedAt: new Date(),
  }

  moviesDB.push(newMovie)

  fs.writeFileSync(
    path.join(__dirname, "movies.json"),
    JSON.stringify(moviesDB)
  )

  res.status(201).send({ id: newMovie.ID })
})

router.delete("/:id", (req, res) => {
  const moviesDB = readFile("movies.json")
  const newDb = moviesDB.filter(movie => movie.ID !== req.params.id)
  fs.writeFileSync(path.join(__dirname, "movies.json"), JSON.stringify(newDb))

  res.status(204).send()
})

router.put("/:id", (req, res) => {
  const moviesDB = readFile("movies.json")
  const newDb = moviesDB.filter(movie => movie.ID !== req.params.id)

  const modifiedMovie = {
    ...req.body,
    ID: req.params.id,
    modifiedAt: new Date(),
  }

  newDb.push(modifiedMovie)
  fs.writeFileSync(path.join(__dirname, "movies.json"), JSON.stringify(newDb))

  res.send({ id: modifiedMovie.ID })
})

module.exports = router
