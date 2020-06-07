const crypto = require('crypto')
const { MONGODB_URL } = require('./environments')
const path = require('path')

const GridFsStorage = require('multer-gridfs-storage')
const storage = GridFsStorage({
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
                    bucketName: 'images'
                };
                resolve(fileInfo);
            });
        });
    }
});

module.exports = storage