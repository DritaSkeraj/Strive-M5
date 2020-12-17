const express = require("express")
const { check, validationResult, matchedData } = require("express-validator")
const { createReadStream } = require("fs-extra")
const { join } = require("path")
const { Transform } = require("json2csv")
const { pipeline } = require("stream")

const { getBooks, writeBooks } = require("../../fsUtilities")

const booksRouter = express.Router()

booksRouter.get("/", async (req, res, next) => {
  try {
    const books = await getBooks()

    if (req.query && req.query.category) {
      const filteredBooks = books.filter(
        book =>
          book.hasOwnProperty("category") &&
          book.category === req.query.category
      )
      res.send(filteredBooks)
    } else {
      res.send(books)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

booksRouter.get("/:asin", async (req, res, next) => {
  try {
    const books = await getBooks()

    const bookFound = books.find(book => book.asin === req.params.asin)

    if (bookFound) {
      res.send(bookFound)
    } else {
      const err = new Error()
      err.httpStatusCode = 404
      next(err)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

booksRouter.post(
  "/",
  [
    check("asin").exists().withMessage("ASIN is required"),
    check("title").exists().withMessage("Title is required"),
    check("price").exists().withMessage("Price is required"),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const error = new Error()
        error.message = errors
        error.httpStatusCode = 400
        next(error)
      } else {
        const books = await getBooks()

        const asinFound = books.find(book => book.asin === req.body.asin)

        if (asinFound) {
          const error = new Error()
          error.httpStatusCode = 400
          error.message = "Book already in db"
          next(error)
        } else {
          books.push(req.body)
          await writeBooks(books)
          res.status(201).send({ asin: req.body.asin })
        }
      }
    } catch (error) {
      console.log(error)
      const err = new Error("An error occurred while reading from the file")
      next(err)
    }
  }
)

booksRouter.put(
  "/:asin",
  check("title").exists().withMessage("Title is required"),
  check("price").exists().withMessage("Price is required"),
  check("category").exists().withMessage("Category is required"),
  check("img").exists().withMessage("Img is required"),
  async (req, res, next) => {
    try {
      const validatedData = matchedData(req)
      const books = await getBooks()

      const bookIndex = books.findIndex(book => book.asin === req.params.asin)

      if (bookIndex !== -1) {
        // book found
        const updatedBooks = [
          ...books.slice(0, bookIndex),
          { ...books[bookIndex], ...validatedData },
          ...books.slice(bookIndex + 1),
        ]
        await writeBooks(updatedBooks)
        res.send(updatedBooks)
      } else {
        const err = new Error()
        err.httpStatusCode = 404
        next(err)
      }
    } catch (error) {
      console.log(error)
      const err = new Error("An error occurred while reading from the file")
      next(err)
    }
  }
)

booksRouter.delete("/:asin", async (req, res, next) => {
  try {
    const books = await getBooks()

    const bookFound = books.find(book => book.asin === req.params.asin)

    if (bookFound) {
      const filteredBooks = books.filter(book => book.asin !== req.params.asin)

      await writeBooks(filteredBooks)
      res.status(204).send()
    } else {
      const error = new Error()
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

booksRouter.get("/export/CSV", async (req, res, next) => {
  try {
    // SOURCE (FILE ON DISK) --> TRANSFORM (.json into .csv) --> DESTINATION (HTTP Res)
    const booksPath = join(__dirname, "./books.json")
    const source = createReadStream(booksPath)

    const transformJsonIntoCsv = new Transform({
      fields: ["asin", "title", "price", "category"],
    })

    res.setH4eader("Content-Disposition", "attachment; filename=whatever.csv") // prompts out the "save on disk" window on browsers

    pipeline(source, transformJsonIntoCsv, res, err => {
      if (err) {
        console.log(err)
        next(err)
      } else {
        console.log("done")
      }
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = booksRouter
