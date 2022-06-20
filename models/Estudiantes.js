const mongoose = require('mongoose')

const { Schema } = mongoose


const EstudianteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true,
    },
    edad: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true,
    },
    colegio: {
        type: String,
        required: true,
    },
    imagen:{
        type : String,
        required:true,
    }

})

const Estudiante = mongoose.model('estudiante', EstudianteSchema)
module.exports = Estudiante