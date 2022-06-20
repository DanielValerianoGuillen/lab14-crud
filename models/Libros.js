const mongoose = require("mongoose");

const { Schema } = mongoose;
const librosSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    autor: {
        type: String,
        required: true,
    },
});
const books = mongoose.model("book", librosSchema);
module.exports = books;
