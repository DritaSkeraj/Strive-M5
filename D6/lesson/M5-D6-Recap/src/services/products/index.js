const express = require("express")
const { check, validationResult } = require("express-validator")
const uniqid = require("uniqid")
const { getProducts, writeProducts } = require("../../lib/fsUtilities")

const productsRouter = express.Router()

const productsValidation = [
  check("name").exists().withMessage("Name is required!"),
  check("brand").exists().withMessage("Brand is required!"),
]

const reviewsValidation = [
  check("rate").exists().withMessage("Rate is required!"),
  check("comment").exists().withMessage("Comment is required!"),
]

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getProducts()

    if (req.query && req.query.category) {
      const filteredProducts = products.filter(
        product =>
          product.hasOwnProperty("category") &&
          product.category === req.query.category
      )
      res.send(filteredProducts)
    } else {
      res.send(products)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const products = await getProducts()

    const productFound = products.find(
      product => product._id === req.params.productId
    )

    if (productFound) {
      res.send(productFound)
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

productsRouter.post("/", productsValidation, async (req, res, next) => {
  try {
    const validationErrors = validationResult(req)

    const whiteList = ["name", "description"]

    if (!validationErrors.isEmpty()) {
      const error = new Error()
      error.httpStatusCode = 400
      error.message = validationErrors
      next(error)
    } else {
      const products = await getProducts()

      products.push({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
        _id: uniqid(),
        reviews: [],
      })
      await writeProducts(products)
      res.status(201).send()
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

productsRouter.put(
  "/:productId",
  productsValidation,
  async (req, res, next) => {
    try {
      const validationErrors = validationResult(req)

      if (!validationErrors.isEmpty()) {
        const error = new Error()
        error.httpStatusCode = 400
        error.message = validationErrors
        next(error)
      } else {
        const products = await getProducts()

        const productIndex = products.findIndex(
          product => product._id === req.params.productId
        )

        if (productIndex !== -1) {
          // product found
          const updatedProducts = [
            ...products.slice(0, productIndex),
            { ...products[productIndex], ...req.body },
            ...products.slice(productIndex + 1),
          ]
          await writeProducts(updatedProducts)
          res.send(updatedProducts)
        } else {
          const err = new Error()
          err.httpStatusCode = 404
          next(err)
        }
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    const products = await getProducts()

    const productFound = products.find(
      product => product._id === req.params.productId
    )

    if (productFound) {
      const filteredProducts = products.filter(
        product => product._id !== req.params.productId
      )

      await writeProducts(filteredProducts)
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

productsRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
    const products = await getProducts()

    const productFound = products.find(
      product => product._id === req.params.productId
    )

    if (productFound) {
      res.send(productFound.reviews)
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

productsRouter.get("/:productId/reviews/:reviewId", async (req, res, next) => {
  try {
    const products = await getProducts()

    const productFound = products.find(
      product => product._id === req.params.productId
    )

    if (productFound) {
      const reviewFound = productFound.reviews.find(
        review => review._id === req.params.reviewId
      )
      if (reviewFound) {
        res.send(reviewFound)
      } else {
        const error = new Error()
        error.httpStatusCode = 404
        next(error)
      }
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

productsRouter.post(
  "/:productId/reviews",
  reviewsValidation,
  async (req, res, next) => {
    try {
      const products = await getProducts()

      const productIndex = products.findIndex(
        product => product._id === req.params.productId
      )
      if (productIndex !== -1) {
        // product found
        products[productIndex].reviews.push({
          ...req.body,
          _id: uniqid(),
          createdAt: new Date(),
        })
        await writeProducts(products)
        res.status(201).send(products)
      } else {
        // product not found
        const error = new Error()
        error.httpStatusCode = 404
        next(error)
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

productsRouter.put(
  "/:productId/reviews/:reviewId",
  reviewsValidation,
  async (req, res, next) => {
    try {
      const products = await getProducts()

      const productIndex = products.findIndex(
        product => product._id === req.params.productId
      )

      if (productIndex !== -1) {
        const reviewIndex = products[productIndex].reviews.findIndex(
          review => review._id === req.params.reviewId
        )

        if (reviewIndex !== -1) {
          const previousReview = products[productIndex].reviews[reviewIndex]

          const updateReviews = [
            ...products[productIndex].reviews.slice(0, reviewIndex), // {}, {}, {}
            { ...previousReview, ...req.body, updatedAt: new Date() }, // previousReview:{ _id: 1, rate: 1, comment: "old comment"} req.body: { comment: "new comment"}, newObject: {_id, rate: 1, comment: "new comment"}
            ...products[productIndex].reviews.slice(reviewIndex + 1),
          ] // [before the specific review I'm trying to modify, {the modified review}, after the specified review I'm trying to modify]
          // [{}, {}, {}, {x}, {}, {}]
          products[productIndex].reviews = updateReviews

          await writeProducts(products)
          res.send(products)
        } else {
          console.log("Review not found")
        }
      } else {
        console.log("Product not found")
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

productsRouter.delete(
  "/:productId/reviews/:reviewId",
  async (req, res, next) => {
    try {
      const products = await getProducts()

      const productIndex = products.findIndex(
        product => product._id === req.params.productId
      )

      if (productIndex !== -1) {
        products[productIndex].reviews = products[productIndex].reviews.filter(
          review => review._id !== req.params.reviewId
        )

        await writeProducts(products)
        res.send(products)
      } else {
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

module.exports = productsRouter
