const Books = require("../models/Libros");

const mostrarLibros = async (req, res) => {
    try {
        const book = await Books.find().lean();
        res.render("libros", { book });
    } catch (error) {
        console.log(error);
        res.send("Fallo Algo");
    }
};

const agregarLibros = async (req, res) => {
    const { titulo, genero, autor } = req.body;
    try {
        const book = new Books({
            titulo,
            genero,
            autor,
        });
        await book.save();
        res.redirect("/libros");
    } catch (error) {
        console.log(error);
        res.send("error algo fallo");
    }
};
const eliminarLibro = async (req, res) => {
    const { id } = req.params;
    try {
        await Books.findByIdAndDelete(id);
        res.redirect("/libros");
    } catch (error) {
        console.log(error);
        res.send("error algo fallo");
    }
};
const editarLibroForm = async (req, res) => {
    const { id } = req.params;
    try {
        const idform = await Books.findById(id).lean();
        res.render("libros", { idform });
    } catch (error) {
        console.log(error);
        res.send("error algo fallo");
    }
};

const editarLibro = async (req, res) => {
    const { id } = req.params;
    const { titulo, genero, autor } = req.body;
    try {
        await Books.findByIdAndUpdate(id, {
            titulo,
            genero,
            autor,
        });
        res.redirect("/libros");
    } catch (error) {
        console.log(error);
        res.send("error algo fallo");
    }
};

module.exports = {
    mostrarLibros,
    agregarLibros,
    eliminarLibro,
    editarLibro,
    editarLibroForm
};
