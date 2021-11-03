const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      })
        .clone()
        .catch(function (err) {
          console.log(err);
        });
    } catch (err) {
      return res
        .status(500)
        .send("Something went wrong. Please try again later");
      console.log(err);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      await User.findOne({ email }, async (err, user) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Something went wrong. Please try again later" });
        } else if (!user) {
          return res.status(403).json({ message: "User not found" });
        } else if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              return res.status(500).json({ message: "Something went wrong" });
            } else if (result) {
              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });
              return res.status(200).json({
                message: "Login successful",
                token,
              });
            } else if (!result) {
              return res.status(403).json({ message: "Incorrect password" });
            }
          });
        }
      })
        .clone()
        .catch(function (err) {
          console.log(err);
        });
    } catch (err) {
      return res
        .status(500)
        .send("Something went wrong. Please try again later");
      console.log(err);
    }
  },
  getUser: (req, res) => {
    try {
      const bearerHeader = req.headers["authorization"];
      if (typeof bearerHeader !== "undefined") {
        const token = bearerHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err, authData) => {
          if (err) {
            return res
              .status(403)
              .json({ message: "Invalid token. Please login again" });
          } else if (authData) {
            await User.findById(authData.id, (err, user) => {
              user.password = undefined;
              return res.status(200).json({
                message: "Token verified",
                user,
              });
            })
              .clone()
              .catch(function (err) {
                console.log(err);
              });
          }
        });
      }
    } catch (err) {
      return res
        .status(500)
        .send("Something went wrong. Please try again later");
      console.log(err);
    }
  },
};

module.exports = authCont;
