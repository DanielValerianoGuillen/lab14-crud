const express = require("express");
const {
    mostrarProductos,
    agregarProducto,
    eliminarProducto,
    editarProductoForm,
    editarProducto,
} = require("../controller/productosController");
const upload = require("../middleware/file")

const router = express.Router();

router.get("/", mostrarProductos);
router.post("/", upload.single("file"),agregarProducto);
router.get("/eliminar/:id", eliminarProducto);
router.get("/editar/:id", editarProductoForm);
router.post("/editar/:id", editarProducto);

module.exports = router;
