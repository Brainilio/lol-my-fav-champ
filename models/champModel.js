var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var champModel = new Schema({
  Name: {
    type: String
  },
  Type: { type: String },
  Cost: { type: String },
  Lane: { type: String }
});

module.exports = mongoose.model("Champ", champModel);
