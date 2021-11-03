const router = require("express").Router();
const auth = require("./auth");
const getQuote = require("./getQuote");

router.use("/auth", auth);
router.use("/get-quote", getQuote);

module.exports = router;
