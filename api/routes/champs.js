const express = require("express")
const router = express.Router()
const User = require("../modules/userModel")
const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const Champ = require("../modules/champModel")
const auth = require("./verifyToken")

//collectie pagina
router.get("/", auth, async function (req, res) {
	console.log(req.user._id)
	const user = req.user._id
	const perPage = 10
	const page = req.params.start || 1
	const start = parseInt(req.query.start)
	const limit = parseInt(req.query.limit)

	var query = {}

	if (req.query.client) {
		query.client = req.query.client
	}

	Champ.find({
		user,
	})
		.skip(perPage * page - perPage)
		.limit(limit)
		.exec((err, champs) => {
			Champ.countDocuments().exec(function (err, count) {
				if (err) {
					res.status(500).send(err)
				} else {
					let maxPage = Math.ceil(count / limit)
					let returnChamps = []
					let collection = {
						items: [],
						_links: [],
						pagination: {
							currentPage: page,
							currentItems: limit || count,
							totalPages: maxPage,
							totalItems: count,

							_links: {
								first: {
									page: 1,
									href:
										"http://" +
										req.headers.host +
										"/champs/?start=1$limit=" +
										limit,
								},
								last: {
									page: maxPage,
									href:
										"http://" +
										req.headers.host +
										"/champs/?start=" +
										(count - limit + 1) +
										"&limit=" +
										limit,
								},
								previous: {
									page: page - 1,
									href:
										"http://" +
										req.headers.host +
										"/champs/?start=" +
										(start - limit) +
										"&limit=" +
										limit,
								},
								next: {
									page: page + 1,
									href:
										"http://" +
										req.headers.host +
										"/champs/?start=" +
										(start + limit) +
										"&limit=" +
										limit,
								},
							},
						},
					}

					champs.forEach(function (element, index, array) {
						let newChamp = element.toJSON()
						newChamp._links = {}
						newChamp._links.self = {
							href: "http://" + req.headers.host + "/champs/" + newChamp._id,
						}
						newChamp._links.collection = {
							href: "http://" + req.headers.host + "/champs/",
						}

						returnChamps.push(newChamp)
						collection.items = returnChamps
					})

					collection._links = {}
					collection._links.self = {
						href: "http://" + req.headers.host + "/champs/",
					}

					res.json(collection)
				}
			})
		})
})
router.post("/", auth, async (req, res) => {
	try {
		let user = req.user._id
		let { name, type, lane, cost } = req.body
		let champ = new Champ({
			name,
			type,
			lane,
			cost,
			user,
		})

		await champ.save()

		res.status(201).send({
			message: "success",
			data: champ,
		})
	} catch (error) {
		res.status(400).send({
			message: "something went wrong",
			error,
		})
	}
})
router.options("/", auth, (req, res) => {
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	res.header("Access-Control-Allow-Headers", "origin, content-type, accept")
	req.accepts("json" || "xml" || "x-www-form-urlencoded")
	res.header("Allow", "GET, POST, OPTIONS")
	res.send(200)
})
//detail pagina
router.use("/:champId", auth, async function (req, res, next) {
	try {
		await Champ.findById(req.params.champId, async (err, champ) => {
			if (err) res.status(500).send(err)
			if (req.user._id != champ.user._id) res.status(400).send("unauthorized")
			if (req.user._id == champ.user._id) {
				req.champ = await champ
				next()
			}
		})
	} catch (error) {
		res.status(404).send("no champ found")
	}
})
router.get("/:champId", auth, (req, res, next) => {
	var returnChamp = req.champ.toJSON()
	returnChamp._links = {}
	returnChamp._links.collection = {
		href: "http://" + req.headers.host + "/champs",
	}
	returnChamp._links.self = {
		href: "http://" + req.headers.host + "/champs/" + returnChamp._id,
	}

	res.status(200).json(returnChamp)
})
router.delete("/:champId", auth, (req, res, next) => {
	let champion = Champ.findById(req.params.champId)
	req.champ.remove(function (err) {
		if (err) {
			res.status(500).send(err)
		} else {
			res.send(204)
		}
	})
})
router.put("/:champId", auth, (req, res) => {
	Champ.findById(req.params.champId)
	if (req.body.name && req.body.lane && req.body.type && req.body.cost) {
		req.champ.name = req.body.name
		req.champ.lane = req.body.lane
		req.champ.type = req.body.type
		req.champ.cost = req.body.cost
		req.champ.save()
		res.send(req.champ)
	} else {
		res.status(422).send("I think you forgot something.")
	}
})
router.options("/:champId", auth, (req, res) => {
	res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
	res.header("Allow", "GET, PATCH, PUT, DELETE, OPTIONS")
	return res.status(200).json({})
})

module.exports = router
