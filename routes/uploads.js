const express = require('express')
const router = express.Router()
const mongoose = require('../configs/database')
const Grid = require("gridfs-stream")
const { uploads } = require('../storage/storage')
const mongo = require('mongodb')
const conn =mongoose.connection
let gfs

conn.once("open", () => {
    console.log("> successfully opened the database")
    gfs = Grid(conn.db, mongo)
});

router.post('/', uploads.single('avatar'), (req, res, next) => {
    res.status(200).send({file:req.file})
})

router.get('/:filename', async(req, res) => {
    try{
        console.log(gfs.files.find())
        await gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        console.log(err,file,'ss')
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists',
            })
        }
        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename)
            readstream.pipe(res)
        } else {
            res.status(404).json({
                err: 'Not an image',
            })
        }
    })
}catch(e){
    console.log(e)
}
})
module.exports = router 