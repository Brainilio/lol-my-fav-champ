const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = require("../modules/userModel")
const express = require("express")
const bcrypt = require("bcryptjs")
const router = express.Router()
const auth = require("./verifyToken")
const Joi = require("@hapi/joi")

const schema = Joi.object({
	name: Joi.string().min(6).required(),
	email: Joi.string().min(6).required().email(),
	password: Joi.string().min(6).required(),
})

const login = Joi.object({
	email: Joi.string().min(6).required().email(),
	password: Joi.string().min(6).required(),
})

router.post("/register", async (req, res) => {
	const { error } = schema.validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const emailExist = await User.findOne({ email: req.body.email })
	if (emailExist) return res.status(400).send("email already exists")

	const salt = await bcrypt.genSalt(10)
	const hashPassword = await bcrypt.hash(req.body.password, salt)

	const user = await new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword,
	})

	try {
		const savedUser = await user.save()
		res.send({ user: savedUser._id, name: savedUser.name })
	} catch (err) {
		return res.status(400).send("uhm ", err)
	}
})

router.post("/login", async (req, res) => {
	const { error } = login.validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)
	try {
		const user = await User.findOne({ email: req.body.email })
		if (!user) return res.status(400).send("user doesnt exist")

		const validPass = await bcrypt.compare(req.body.password, user.password)
		if (!validPass) return res.status(400).send("invalid password")

		// login-token
		const token = jwt.sign({ _id: user._id }, "login-token")

		res
			.status(201)
			.header("authorization", token)
			.json({
				status: "success",
				token,
				data: {
					id: user._id,
					user: user.name,
				},
			})
	} catch (error) {
		return res.status(400).send(error)
	}
})

module.exports = router
