require('dotenv').config()

const AWS = require('aws-sdk')

AWS.config.update({
    secretAccessKey : process.env.AWS_SECRET_KEY,
    accessKeyId : process.env.AWS_ACCESS_KEY,
    region : process.env.AWS_BUCKET_REGION
})

console.log("Conectado a S3!!");

module.exports = {AWS}