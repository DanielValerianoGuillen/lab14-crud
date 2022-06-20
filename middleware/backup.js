require('dotenv').config();
const aws = require('aws-sdk');
const BUCKET =  process.env.AWS_BUCKET_NAME;

const s3 = new aws.S3();
exports.backupData = async (data) => {
    try {

        const file = `db-${Date.now()}.json`;
        const buf = Buffer.from(JSON.stringify(data));
        const params = ({
            Bucket: BUCKET,
            Key: file,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: 'application/json'
        });
        await s3.upload(params, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log('se subio correctamente');
            }
        }).promise();
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

