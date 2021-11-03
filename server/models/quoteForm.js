const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteFormSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    prefStack: {
      type: String,
      required: true,
    },
    documented: {
      type: Boolean,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuoteForm", quoteFormSchema);
