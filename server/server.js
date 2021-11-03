if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;
const app = express();
const DB_URL = process.env.DB_URL;

// Cors policy option for safety of routes in production
const corsOptions = {
  origin: "*",
  method: ["GET", "POST"],
};

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DB_URL);
}

// For 404 Page Not Found route!
app.get("*", (req, res) => {
  res.send("404 | This route does not exist");
});

// Creating server with a port number of 5000 locally
app.listen(port, () => console.log(`Server is running on port ${port}`));
