let express = require("express")
mongoose = require("mongoose")
bodyParser = require("body-parser")
morgan = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv")

const app = express()

app.use(cors())

var port = process.env.PORT || 8000

dotenv.config({
	path: "./config.env",
})

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Origin, Authorization"
	)
	res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
	res.header("Allow", "GET, PATCH, PUT, DELETE, OPTIONS")

	if (req.accepts("json" || "xml" || "x-www-form-urlencoded")) {
		next()
	} else {
		res.sendStatus(406)
	}
})

mongoose
	.connect(process.env.MONGO_DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("Running mongooose...")
	})
	.catch((error) => console.log(error))

const testRoute = require("./api/routes/champions")
const champRoute = require("./api/routes/champs")
const authRoute = require("./api/routes/auth")

app.use("/user", authRoute)
app.use("/champs", champRoute)
app.use("/testRoute", testRoute)

app.use((req, res, next) => {
	const error = new Error("Not found")
	error.status = 404
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.json({
		error: {
			message: error.message + " " + error.status,
		},
	})
})

app.listen(port, function () {
	console.log("Gulp is running my app on PORT:  " + port)
})

module.exports = app
