const express = require("express");
const {
    mostrarEstudiantes,
    agregarEstudiante,
    eliminarEstudiante,
    editarEstudianteForm,
    editarEstudiante,
    backupEstudiante
} = require("../controller/estudianteController");
const upload = require("../middleware/file")

const router = express.Router();

router.get("/estudiantes", mostrarEstudiantes);
router.post("/estudiantes", upload.single("file"),agregarEstudiante);
router.post("/estudiantes/editar/:id", upload.single("file"), editarEstudiante);
router.get("/estudiantes/eliminar/:id",upload.single("file"), eliminarEstudiante);
router.get("/estudiantes/editar/:id", editarEstudianteForm);
router.get("/bucket", backupEstudiante);

router.get("/formStudent", (req, res)=>{
    res.render("ContentFormStundend")
})
module.exports = router;