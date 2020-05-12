const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let champSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  cost: { type: String, required: true },
  lane: { type: String, required: true }
});

const Champ = mongoose.model("Champ", champSchema);

module.exports = Champ;
