const Estudiante = require("../models/Estudiantes");
const AWS = require('aws-sdk')
require('dotenv').config()
const s3 = new AWS.S3();
const BUCKET = process.env.AWS_BUCKET_NAME

const backUpFunction = require('../middleware/backup')


const mostrarEstudiantes = async (req, res) => {
    try {
        const estudiante = await Estudiante.find().lean();
        res.render("estudiantes", { estudiante: estudiante });
    } catch (error) {
        console.log(error);
        res.send("Fallo Algo");
    }
};


const agregarEstudiante = async (req, res) => {
    let { nombre, apellido, edad, genero, colegio } = req.body;

    try {
        let imagen = req.file.location
        const estudiante = new Estudiante({
            nombre,
            apellido,
            edad,
            genero,
            colegio,
            imagen: imagen
        });
        await estudiante.save();
        res.redirect("/estudiantes");
    } catch (error) {
        console.log(error);
        res.send("error algo fallo");
    }
};

const eliminarEstudiante = async (req, res) => {
    const { id } = req.params;
    try {
        let estudiantes = await Estudiante.findById(id)
        let imagenName = (estudiantes.imagen).substring(48) 
        await Estudiante.findOneAndRemove({_id:id});
        await s3.deleteObject({Bucket:BUCKET,Key:imagenName}).promise();
        res.redirect("/estudiantes");
    } catch (error) {
        console.log(error);
        res.send("error algo fallo");
    }
};


const editarEstudianteForm = async (req, res) => {
    const { id } = req.params;
    try {
        const idform = await Estudiante.findById(id).lean();
        res.render("ContentFormStundend", { idform });
    } catch (error) {
        console.log(error);
        res.send("error algo fallo");
    }
};

const editarEstudiante = async (req, res) => {
    const { id } = req.params;
    let { nombre, apellido, edad, genero, colegio } = req.body;

    let estudiantes = await Estudiante.findById(id)
    if (!estudiantes) {
        res.status(400).json({msg:"No existe estudiante"})
    }
    try {
        let imagenName = (estudiantes.imagen).substring(48) 
        await s3.deleteObject({Bucket:BUCKET,Key:imagenName}).promise();

        estudiantes.nombre = nombre,
        estudiantes.apellido = apellido
        estudiantes.edad = edad
        estudiantes.genero = genero
        estudiantes.colegio = colegio
        estudiantes.imagen = req.file.location

        await Estudiante.findOneAndUpdate({_id:id},estudiantes);

        res.redirect("/estudiantes");
    } catch (error) {
        console.log(error);
        res.send("error algo fallo");
    }
};

const backupEstudiante = async (req, res) => {
    try {
        const data = await Estudiante.find();
        if (data == '') {
            req.session.message = { type: 'Danger', message: 'No hay alumnos registrados'};
            console.log("No hay alumnos registrados");
            res.redirect('/estudiantes');
        } 
        else {
            const result = await backUpFunction.backupData(data);
            if (result == true) {
                console.log("Se guardaron los datos");
            } 
            else {
                console.log("No se lograron guardar los datos");
            }
            res.redirect('/estudiantes');
        }
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    mostrarEstudiantes,
    agregarEstudiante,
    eliminarEstudiante,
    editarEstudianteForm,
    editarEstudiante,
    backupEstudiante,
};
