const mongoose = require("mongoose");

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  carts: [{ type: mongoose.Schema.Types.ObjectId, ref: "carts" }],
  role: { type: String, default: 'user' }
});

const userModel = mongoose.model(userCollection, userSchema);

module.exports = { userModel };
