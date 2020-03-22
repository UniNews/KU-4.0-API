const { MONGODB_URL } = require('../configs/environments')
const crypto = require('crypto')
const path = require('path')
var multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
var storage = new GridFsStorage({
    url: MONGODB_URL,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
            });
        });
    }
});

const uploads = multer({ storage })
module.exports = { uploads }