const { Router } = require("express")
const { cartsModel } = require("../models/carts.model")

const router = Router()


//get
router.get("/", async (req, res) => {

    try {
        let carts = await cartsModel.find()
        res.send({ result: "success", payload: carts })
    } catch (error) {
        console.log(error)
    }
});

//post
router.post("/", async (req, res) => {
    let { descripcion, quantity, total } = req.body

    if (!descripcion || !quantity || !total) {
        res.send({ status: "error", error: "Faltan parametros" })
    }
    let result = await cartsModel.create({ descripcion, quantity, total })
    res.send({ result: "success", payload: result })
});

//put
router.put("/:cid", async (req, res) => {
    let { cid } = req.params

    let cartsToReplace = req.body
    if (!cartsToReplace.descripcion || !cartsToReplace.quantity || !cartsToReplace.total) {
        res.send({ status: "error", error: "Faltan parametros" })
    }

    let result = await cartsModel.updateOne({_id: cid}, cartsToReplace)
    res.send({ result: "success", payload: result })
});

//delete
router.delete("/:cid", async(req, res) => {
    let {cid} = req.params
    let result = await cartsModel.deleteOne({_id: cid})
    res.send({ result: "success", payload: result })
});

module.exports = router;
