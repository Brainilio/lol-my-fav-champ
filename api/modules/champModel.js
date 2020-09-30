var mongoose = require("mongoose"),
	Schema = mongoose.Schema

var champModel = new Schema({
	userId: {
		type: String,
	},
	name: {
		type: String,
	},
	type: { type: String, required: false },
	cost: { type: String, required: false },
	lane: { type: String, required: false },
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

// populate the reviews with guides & tours
champModel.pre(/^find/, function (next) {
	this.populate({
		path: "user",
		select: "name",
	})
	next()
})

module.exports = mongoose.model("Champ", champModel)

module.exports.get = function (callback, limit) {
	Champ.find(callback).limit(limit).lean()
}
