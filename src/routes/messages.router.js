const { Router } = require("express")
const { messagesModel } = require("../models/messages.model")

const router = Router()

//get
router.get("/", async (req, res) => {

    try {
        let messages = await messagesModel.find()
        res.send({ result: "success", payload: messages })
    } catch (error) {
        console.log(error)
    }
});

//post
router.post("/", async (req, res) => {
    let { users, messages } = req.body

    if (!users || !messages ) {
        res.send({ status: "error", error: "Faltan campos" })
    }
    let result = await messagesModel.create({ users, messages })
    res.send({ result: "success", payload: result })
});

//put
router.put("/:mid", async (req, res) => {
    let { mid } = req.params

    let messagesToReplace = req.body
    if (!messagesToReplace.users || !messagesToReplace.message ) {
        res.send({ status: "error", error: "Faltan Campos" })
    }

    let result = await messagesModel.updateOne({_id: mid}, messagesToReplace)
    res.send({ result: "success", payload: result })
});

//delete
router.delete("/:mid", async(req, res) => {
    let {mid} = req.params
    let result = await messagesModel.deleteOne({_id: mid})
    res.send({ result: "success", payload: result })
});

module.exports = router;
