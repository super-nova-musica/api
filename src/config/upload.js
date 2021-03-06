const multer  = require('multer');
const aws = require('ibm-cos-sdk');
const path = require('path');
const crypto = require('crypto');
const multerS3 = require('multer-s3');

const config = {
  endpoint: new aws.Endpoint(process.env.AWS_ENDPOINT),
  apiKeyId: process.env.AWS_API_KEY_ID,
  credentials: new aws.Credentials(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY),
  signatureVersion: process.env.AWS_SIGNATURE_VERSION,
  region: process.env.AWS_DEFAULT_REGION,
  serviceInstancedId: process.env.AWS_SERVICE_INSTANCED_ID
}

const storageTypes = {
    local: multer.diskStorage({
        destination:  path.resolve(__dirname, '..', '..', 'tmp','uploads'),
        filename: (req, file, cb) => {
            crypto.randomBytes(8, (err, hash) => {
                if(err) cb(err);

               file.music = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.music);
            console.log(file)

            });
        }
    }),
    cloud: multerS3({
        s3: new aws.S3(config),
        bucket: 'flux-storage',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(8, (err, hash) => {
                if(err) cb(err);

               file.music = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.music);
            });
            console.log(file)
        }

    })
}
module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp','uploads'),
    storage: storageTypes[process.env.STORAGE_TYPE],
    limits: {
        fileSize: 10 * 1024 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
            'audio/mpeg',
            'audio/mp4',
            'audio/ogg',
            'audio/acc',
            'audio/mp3'


        ];

        if(allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'))
        }
    }
};
