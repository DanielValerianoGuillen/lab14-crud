const mongoose = require('mongoose')

const { Schema } = mongoose


const productSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
    },
    precio: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    },
    imagen:{
        type : String,
        required:true,
    }

})

const product = mongoose.model('product', productSchema)
module.exports = product