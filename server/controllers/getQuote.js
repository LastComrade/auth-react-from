const QuoteForm = require("../models/quoteForm");

const getQuote = {
  index: async (req, res) => {
    try {
      let {
        name,
        contact,
        email,
        category,
        prefStack,
        documented,
        budget,
        projectDescription,
      } = req.body;
      if (
        name &&
        contact &&
        email &&
        category &&
        prefStack &&
        documented &&
        budget &&
        projectDescription
      ) {
        name = name.trim();
        contact = contact.trim();
        email = email.trim();
        category.value = category.value.trim();
        prefStack = prefStack.trim();
        budget.value = budget.value.trim();
        projectDescription = projectDescription.trim();
        const quoteForm = new QuoteForm({
          name,
          contact,
          email,
          category: category.value,
          prefStack,
          documented: documented.value,
          budget: budget.value,
          projectDescription,
        });
        await quoteForm.save();
        return res.status(200).json({
          success: true,
          message: "Quote form submitted successfully",
        });
      } else {
        return res
          .status(200)
          .json({ success: false, message: "Please fill all fields" });
      }
    } catch (err) {
      res.status(500).send("Something went wrong. Please try again later");
    }
  },
};

module.exports = getQuote;
