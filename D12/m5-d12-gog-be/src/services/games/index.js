const express = require("express")
const fs = require("fs-extra")
const uniqid = require("uniqid")
const path = require("path")
const multer = require("multer")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "games"
    }
})
const cloudMulter =  multer({ storage: cloudStorage})

const router = express.Router()
const gamesFilePath = path.join(__dirname, "games.json")

const readFile = async () => {
    const buffer = await fs.readFile(gamesFilePath)
    const text = buffer.toString()
    return JSON.parse(text)
}

const writeFile = async (content) => await fs.writeFile(gamesFilePath, JSON.stringify(content)) 

// GET all the games
router.get("/", async (req, res, next) => {
    res.send(await readFile())
})

// CREATE a new game (using Cloudinary as CDN for Images)
router.post("/", cloudMulter.single("cover"), async (req, res, next) =>{
    try{
        // read the body from req.body.name
        const newGame = JSON.parse(req.body.game)
        // stich the image in it from cloudinary
        newGame.image = req.file.path
        newGame.id = uniqid()
        const currentGames = await readFile()
        // currentGames.push(newGame)
        // writeFile(currentGames)
        await writeFile([...currentGames, newGame])
        // save it into the JSON file
        // image, title, price, genre, id
        // req.body.name
        res.status(201).send(newGame.id)
    }
    catch(ex){
        console.log(ex)
        next(ex)
    }
})

// EDIT a game
router.put("/:id", async (req, res, next) => {
    try{
        const fullList = await readFile() // getting the full list
        const remainingList = fullList.filter(game => game.id !== req.params.id) // we exlude from the list the element we want to update
        const toUpdate = fullList.find(game => game.id === req.params.id) // we take the element we want to update
        if (!toUpdate){ // if the element does not exist => 404
            const error = new Error("Cannot find element " + req.params.id)
            error.httpStatusCode = 404
            next(error)
        }

        delete req.body.id // for security reason, we don't want the user to be able to modify games ID
        const updatedGame =
            {
                ...toUpdate, // followed by the previous element stitched with the properties we have in the body
                ...req.body
            }
            
        await writeFile([ // write down the elements without the one we are updating
            ...remainingList, 
            updatedGame
        ])

        res.send(req.params.id)
    }
    catch(e){
        next(e)
    }
})

// DELETE a game
router.delete("/:id", async(req,res,next)=>{
    const fullList = await readFile()
    const remainingList = fullList.filter(game => game.id !== req.params.id)
    if (remainingList.length === fullList.length){
        const error = new Error("Cannot find element " + req.params.id)
        error.httpStatusCode = 404
        next(error)
    }

    await writeFile(remainingList)
    res.send("Deleted")
})

module.exports = router