require('dotenv').config()
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const BUCKET =  process.env.AWS_BUCKET_NAME

const s3 = new AWS.S3();

const upload = multer({
    storage:multerS3({
        bucket : BUCKET,
        s3:s3,
        acl : 'public-read',
        key:function (req,file,cb){
            console.log(file)
            cb(null,file.originalname)
        }
    })
})
module.exports = 
    upload
