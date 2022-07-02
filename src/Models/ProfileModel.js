const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    FirstName: { type: String },
    LastName: { type: String },
    Email: { type: String },
    Mobile: { type: String },
    UserName: { type: String, unique: true },
    Password: { type: String },
    Country: { type: String },
  },
  {
    versionKey: false,
  }
);

const profileModel = mongoose.model("Profiles", dataSchema);

module.exports = profileModel;
