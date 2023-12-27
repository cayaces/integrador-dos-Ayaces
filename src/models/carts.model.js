//importar mongoose
const mongoose = require("mongoose")

//aqui crear la coleccion
const cartsCollection = "carts"

//aqui es schema
const cartsSchema = new mongoose.Schema({
    descripcion: { type: String, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true }
})

//exportacion de mongoose
const cartsModel = mongoose.model(cartsCollection, cartsSchema)

module.exports = { cartsModel }
