const express = require("express")
const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const sgMail = require("@sendgrid/mail")

const cloudinary = require("../../cloudinary")
const { getUsers, writeUsers } = require("../../fsUtilities")

const usersRouter = express.Router()

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "striveTest",
  },
})

const cloudinaryMulter = multer({ storage: storage })

usersRouter.post(
  "/",
  cloudinaryMulter.single("image"),
  async (req, res, next) => {
    try {
      const users = await getUsers()

      users.push({
        ...req.body,
        img: req.file.path,//the cloudinary url
      })

      await writeUsers(users)
      res.json(users)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)

usersRouter.post("/sendEmail", async (req, res, next) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to: "",
      from: "",
      subject: "Sending with Twilio SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    }

    await sgMail.send(msg)
    res.send("sent")
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
