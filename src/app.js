const express = require("express")
const app = express();


const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importacion de rutas
/* const toysRouter = require("./router/toys");
const usersRouter = require("./router/users");

app.use("/toys", toysRouter)
app.use("/toys", usersRouter)
*/
app.listen(PORT, ()=>{
    console.log(`Sevidor corriendo en el purto ${PORT} `)
})