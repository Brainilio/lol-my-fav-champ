const jwt = require("jsonwebtoken")

module.exports = function auth(req, res, next) {
	const token = req.header("authorization")
	if (!token) return res.status(401).send("Access denied!")

	try {
		const verified = jwt.verify(token, "login-token")
		req.user = verified
		next()
	} catch (err) {
		res.status(400).send("invalid token")
	}
}
