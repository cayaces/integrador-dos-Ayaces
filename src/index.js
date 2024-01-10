const express = require("express")
const { engine } = require("express-handlebars")
const path = require("path")
const { default: mongoose } = require("mongoose")
const productsRouter = require("./routes/products.router")
const cartsRouter = require("./routes/carts.router")
const messagesRouter = require("./routes/messages.router")
const uploadRouter = require("./routes/upload.router")
const sessionRouter = require("./routes/sessions.router.js")
const handlebars = require("express-handlebars")
const multer = require('multer');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const { userModel } = require("./models/users.model");
const MongoStore = require("connect-mongo")
const { createHash, isValidPassword, generateToken } = require("./utils.js")
const cookieParser = require("cookie-parser")

const app = express();
const PORT = 8080;


// Configuración de Passport
app.use(session({ 
  secret: "CoderKey",
   resave: false,
    saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

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
app.use("/api/sessions", sessionRouter)

app.post("/login", passport.authenticate('local', { session: false }), (req, res) => {
  const token = generateToken(req.user)
  res.json({ token })
})

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
