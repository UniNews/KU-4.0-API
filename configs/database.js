const mongoose = require("mongoose")
const { MONGODB_URL } = require('./environments');
mongoose.connect(MONGODB_URL, {
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