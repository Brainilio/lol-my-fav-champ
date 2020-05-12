const express = require("express");
const router = express.Router();

require("./routes/champ")(router);

module.exports = router;
