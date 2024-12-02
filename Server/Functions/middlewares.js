const secret_key = "qwertyuiopkjhgf987654g[;,mhgdxcvbnl;jhtrdcvbnkl;lkjhg"
const jwt = require('jsonwebtoken')
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const verification = function (req,res,next){
    const token = req.body.Authorization
    
    if(!token){
        res.status(400).json({
            msg : "Token Required"
        })
    }else{
        try{
            req.user = jwt.verify(token,secret_key);
            next()
        }catch(error){
            res.status(400).json({
                msg : "Invalid Token.."
            })
        }
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './Functions/Database/Uploads';
        // Create the directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

module.exports = {verification,storage};