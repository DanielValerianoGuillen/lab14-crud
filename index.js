const express = require('express')
const { create } = require('express-handlebars')
const app = express()
require('dotenv').config()
require('./config/connectionBD')
require('./config/s3')

const hbs = create({
    extname: '.hbs',
    partialsDir: ['views/components']
})

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");


app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended: true }))


//app.use("/", require('./router/productosRoutes'))
app.use("/", require('./router/librosRoutes'))
app.use("/", require('./router/estudiantesRoutes'))

app.use(express.static(__dirname + "/public"))
const EMV_PORT = process.env.PORT || 3000


app.listen(EMV_PORT, () => {
    console.log(`Servidor corriendo 😂😍 http://localhost:${EMV_PORT}`)
})




