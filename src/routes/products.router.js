const { Router } = require("express")
const { productsModel } = require("../models/products.model")

const router = Router()

//get
router.get("/", async (req, res) => {

    try {
        let products = await productsModel.find()
        res.send({ result: "success", payload: products })
    } catch (error) {
        console.log(error)
    }
});

//post
router.post("/", async (req, res) => {
    let { descripcion, precio, stock, imagen } = req.body

    if (!descripcion || !precio || !stock || !imagen) {
        res.send({ status: "error", error: "Error en la escritura" })
    }
    let result = await productsModel.create({ descripcion, precio, stock, imagen })
    res.send({ result: "success", payload: result })
});

//put
router.put("/:pid", async (req, res) => {
    let { pid } = req.params

    let productsToReplace = req.body
    if (!productsToReplace.descripcion || !productsToReplace.precio || !productsToReplace.stock || !productsToReplace.imagen) {
        res.send({ status: "error", error: "Error" })
    }

    let result = await productsModel.updateOne({_id: pid}, productsToReplace)
    res.send({ result: "success", payload: result })
});

//delete
router.delete("/:pid", async(req, res) => {
    let {pid} = req.params
    let result = await productsModel.deleteOne({_id: pid})
    res.send({ result: "success", payload: result })
});

module.exports = router;
