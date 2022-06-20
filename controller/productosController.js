const Product = require("../models/Productos");

const mostrarProductos = async (req, res) => {
    try {
        const product = await Product.find().lean();
        res.render("home", { product: product });
    } catch (error) {
        console.log(error);
        res.send("Fallo Algo");
    }
};
const agregarProducto = async (req, res) => {
    let { nombre, cantidad, precio } = req.body;
    
    try {
        imagen = req.file.location
        const product = new Product({
            nombre,
            cantidad,
            precio,
            total: cantidad * precio,
            imagen:imagen
        });
        await product.save();
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.send("error algo fallo");
    }
};

const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.send("error algo fallo");
    }
};

const editarProductoForm = async (req, res) => {
    const { id } = req.params;
    try {
        const idform = await Product.findById(id).lean();
        res.render("home", { idform });
    } catch (error) {
        console.log(error);
        res.send("error algo fallo");
    }
};

const editarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, cantidad, precio } = req.body;
    try {
        await Product.findByIdAndUpdate(id, {
            nombre,
            cantidad,
            precio,
            total: cantidad * precio,
        });
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.send("error algo fallo");
    }
};

module.exports = {
    mostrarProductos,
    agregarProducto,
    eliminarProducto,
    editarProductoForm,
    editarProducto,
};
