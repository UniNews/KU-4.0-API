const express = require('express')
const router = express.Router()
const storage = require('../configs/storage')
const multer = require('multer')
const Grid = require('gridfs-stream')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const conn = mongoose.connection

let gfs
conn.once('open', () => {
    gfs = Grid(conn.db, mongo)
    gfs.collection('images')
})

const upload = multer({ // multer settings for single upload
    storage: storage
}).single('image')

router.post('/', (req, res, next) => {
    upload(req, res, function (err) {
        if (err)
            res.status(500).end()
        else {
            // res.setHeader('Location', '/images/' + req.file.filename)
            res.json({
                uri: '/images/' + req.file.filename
            })
        }
    })
})

router.get('/:filename', async (req, res) => {
    try {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
            if (!file || file.length === 0)
                return res.status(404).end()
            // Check if image
            if (file.contentType === 'image/jpg' || file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                // set the proper content type 
                res.set('Content-Type', file.contentType)
                const readstream = gfs.createReadStream(file.filename)
                // Read output to browser
                readstream.pipe(res)
            } else
                res.status(404).end()
        })
    } catch (e) {
        res.status(500).end()
    }
})

module.exports = router 