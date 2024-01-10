const { Router } = require("express");
const { userModel } = require("../models/users.model.js");
const { cartsModel } = require("../models/carts.model.js")

const router = Router();

router.get("/", async (req, res) => {
    try {
        const users = await userModel.find().populate("carts");
        res.send({ result: "success", payload: users });
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "error", error: "Internal Server Error" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, carts, role } = req.body;

        const newUser = await userModel.create({
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            role,
        });

        if (carts && carts.length > 0) {
            await cartsModel.insertMany(carts);
            newUser.carts = carts.map(cart => cart._id);
            await newUser.save();
        }

        res.send({ result: "success", payload: newUser });
    } catch (error) {
        console.log(error);
        res.status(400).send({ result: "error", error: "Bad Request" });
    }
});

router.put("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { first_name, last_name, email, age, password, carts } = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).send({ result: "error", error: "User not found" });
        }

        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
        user.age = age;
        user.password = password;

        if (carts && carts.length > 0) {
            await cartsModel.insertMany(carts);
            user.carts = carts.map(cart => cart._id);
        }

        await user.save();

        res.send({ result: "success", payload: user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "error", error: "Internal Server Error" });
    }
});

router.delete("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedUser = await userModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).send({ result: "error", error: "User not found" });
        }

        await cartsModel.deleteMany({ _id: { $in: deletedUser.carts } });

        res.send({ result: "success", payload: deletedUser });
    } catch (error) {
        console.log(error);
        res.status(500).send({ result: "error", error: "Internal Server Error" });
    }
});

module.exports = router;
