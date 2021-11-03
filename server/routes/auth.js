const router = require("express").Router();
const authCont = require("../controllers/auth");
const authMid = require("../middlewares/auth");

router.route("/register").post(authCont.register);
router.route("/login").post(authCont.login);
router.route("/user/:id").get(authMid.checkUser, authCont.getUser);

module.exports = router;
