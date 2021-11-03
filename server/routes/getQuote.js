const router = require("express").Router();
const getQuote = require("../controllers/getQuote");

router.route("/").post(getQuote.index);

module.exports = router;
