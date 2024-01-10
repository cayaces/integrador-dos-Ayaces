const { JWT_SECRET } = require("../utils.js")
const { Router } = require("express")
const { productsModel } = require("../models/products.model.js")
const { verifyToken, cookieParserMiddleware } = require('../utils.js');
const passport = require('passport')

const router = Router()

//get
router.get("/", cookieParserMiddleware, passport.authenticate('cookie', { session: false }),(req, res) => {

    try {
        let products = productsModel.find()
        res.send({ result: "success", payload: products })
    } catch (error) {
        console.log(error)
    }
    res.json({ user: req.user })
});

//post
router.post("/", cookieParserMiddleware, passport.authenticate('cookie', { session: false }), async (req, res) => {
    let { descripcion, precio, stock, imagen } = req.body

    if (!descripcion || !precio || !stock || !imagen) {
        res.send({ status: "error", error: "Error en la escritura" })
    }
    let result = await productsModel.create({ descripcion, precio, stock, imagen })
    res.json({ user: req.user })
});

//put
router.put("/:pid", cookieParserMiddleware, passport.authenticate('cookie', { session: false }), async (req, res) => {
    let { pid } = req.params

    let productsToReplace = req.body
    if (!productsToReplace.descripcion || !productsToReplace.precio || !productsToReplace.stock || !productsToReplace.imagen) {
        res.send({ status: "error", error: "Error" })
    }

    let result = await productsModel.updateOne({_id: pid}, productsToReplace)
    res.json({ user: req.user })
});


//delete
router.delete("/:pid", cookieParserMiddleware, passport.authenticate('cookie', { session: false }), async(req, res) => {
    let {pid} = req.params
    let result = await productsModel.deleteOne({_id: pid})
    res.json({ user: req.user })
});

module.exports = router;
