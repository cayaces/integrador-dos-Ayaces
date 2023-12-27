const express = require("express")
const { engine } = require("express-handlebars")
const path = require("path")
const { default: mongoose } = require("mongoose")
const productsRouter = require("./routes/products.router")
const cartsRouter = require("./routes/carts.router")
const messagesRouter = require("./routes/messages.router")
const uploadRouter = require("./routes/upload.router")
const handlebars = require("express-handlebars")
const multer = require('multer');
//const viewsRouter = require("./routes/views.router.js")


const app = express();
const PORT = 8080;

//conectarse al puerto
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

//middlewords
//enviar y recibir info, no olvidar
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//config carpeta public
app.use(express.static(path.join(__dirname, 'public')))


//conectando mongoose
mongoose.connect("mongodb+srv://coderClau:7725AmorCODER@coderclau.lgoc83w.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp", {
   
})
   .then(() => {
        console.log("Conectado a la base de datos")
    })
    .catch(error => {
        console.log("Error al intentar conectarse a la DB", error)
    })


//Rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/messages", messagesRouter);

//Multer
app.use("/", uploadRouter);

//importante
app.engine("handlebars", engine());
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname + '/views'))

//Static
app.use("/", express.static(__dirname + "/public"));
//app.use(express.urlencoded({ extended: true }))

//View handlebars
app.get("/chat", async (req, res) => {
    res.render("chat", {
        title: "Chat",
    })
})
