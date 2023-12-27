//importar mongoose
const mongoose = require("mongoose")

//aqui crear la coleccion
const messagesCollection = "messages"

//aqui es schema
const messagesSchema = new mongoose.Schema({
    user: { type: String, max: 200, required: true },
    message: { type: String, max: 100, required: true }
})

//exportacion de mongoose

const messagesModel = mongoose.model(messagesCollection, messagesSchema)

module.exports = { messagesModel }