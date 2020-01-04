const mongoose = require("mongoose")
const DEFAULT_URL = "localhost:7000"
const dbPath = process.env.MONGODB_URL || DEFAULT_URL
mongoose.connect(dbPath, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
const db = mongoose.connection
db.on("error", () => {
    console.log("> error occurred from the database")
});
db.once("open", () => {
    console.log("> successfully opened the database")
});

module.exports = mongoose