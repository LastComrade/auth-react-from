const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = this.password.trim();
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    this.name = this.name.trim();
    this.email = this.email.trim();
    this.contact = this.contact.trim();
    next();
  } catch (err) {
    console.log(err);
  }
});

module.exports = mongoose.model("User", userSchema);
