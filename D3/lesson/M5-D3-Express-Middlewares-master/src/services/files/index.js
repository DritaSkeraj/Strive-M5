/*
1. upload single file route

2. upload multiple files route

3. download file route

*/
const epress = require("express");
const multer = require("multer");
const {writeFile} = require("fs-extra");
const {join} = require("path")

const router = express.Router();

const uploadMiddleware = multer({});

const studentsPublicFolderPath = join(__dirname, "../../../public/img/students");


router.post(
  "./uploadPicture",
  uploadMiddleware.single("avatar"),
  async (req, res, next) => {
      try{
        console.log(studentsPublicFolderPath);
        await writeFile(join(studentPublicFolderPath, req.file.originalname), req.file.buffer)
        res.send()
      } catch(error){
          next(error);
      }
  }
);

router.post("/uploadMultiplePictures", uploadMiddleware.array("multipleAvatars"), async(req, res, next))=>{
    
}

module.exports = router;
