//import node modules
const path = require("path");

//import npm modules => https://www.npmjs.com/package/multer
const multer = require('multer')

//DiskStorage: The disk storage engine gives you full control on storing files to disk.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, `../uploads`))
        
    },
    filename: function (req, file, cb) { //save name will be date + original name
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage,
    //fileFilter: Set this to a function to control which files should be uploaded and which should be skipped.
    fileFilter: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname).toLowerCase();
            fileExtension == ".png" || fileExtension == ".jpg" || fileExtension == ".gif" ? cb(null, true)
            : cb(new Error ("Error. Formats allowed: .gif, .png and .jpg")) 
    }
}).single('image');

module.exports = { upload }; 