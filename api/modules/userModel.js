const mongoose = require("mongoose")
Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		min: 6,
		max: 255,
	},
	email: {
		type: String,
		required: true,
		max: 255,
		min: 6,
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		min: 6,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	champs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Champ" }],
})

module.exports = mongoose.model("User", userSchema)
