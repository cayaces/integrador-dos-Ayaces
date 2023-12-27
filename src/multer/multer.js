const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
   
    destination: function(req, file, cb){
        cb(null, __dirname+"/public/files")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

module.exports.uploader = multer({storage})
