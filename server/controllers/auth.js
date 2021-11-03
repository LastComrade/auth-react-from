const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authCont = {
  register: async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, contact, password } = req.body;
      await User.findOne({ email }, async (err, user) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Something went wrong. Please try again later" });
        } else if (user) {
          return res
            .status(403)
            .json({ message: "User with this email address already exists" });
        } else if (!user) {
          const newUser = new User({ name, email, contact, password });
          await newUser.save();
          return res.status(200).json({ message: "User created successfully" });
        }
      }).clone().catch(function(err){ console.log(err)});
    } catch (err) {
      console.log(err);
    }
  },
  login: (req, res) => {
    return null;
  },
  getUser: (req, res) => {
    return null;
  },
};

module.exports = authCont;
