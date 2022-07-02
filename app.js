// Basic Setup
const express = require("express");
const router = require("./src/Routes/Api");
const app = new express();
const bodyParser = require("body-parser");

// Security Middleware
const rate = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// Database MongoDB
const mongoose = require("mongoose");

// Security Middleware Implement

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(hpp());

// Body Parser Implement
app.use(bodyParser.json());

// Request Rate Limited
app.use(rate({ windowMs: 15 * 60 * 1000, max: 3000 }));

// MongoBD Database Connection

const uri =
  "mongodb+srv://amit:zyymWA6aLGC9q2Ak@cluster0.fsp0qs4.mongodb.net/Todo?retryWrites=true&w=majority";

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true },
  () => console.log(" Mongoose is connected")
);

// Default API Router
app.use("/api/v1", router);

// Undefined Router

app.use("*", (req, res) => {
  res.status(404).json({ status: "404", data: "Not found" });
});

module.exports = app;
