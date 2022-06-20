const express = require("express");
const {
    mostrarLibros,
    agregarLibros,
    eliminarLibro,
    editarLibroForm,
    editarLibro,
} = require("../controller/librosController");



const router = express.Router();

router.get("/libros", mostrarLibros);
router.post("/libros", agregarLibros);
router.get("/libros/eliminar/:id", eliminarLibro);
router.get("/libros/editar/:id", editarLibroForm);
router.post("/libros/editar/:id", editarLibro);


module.exports = router;
