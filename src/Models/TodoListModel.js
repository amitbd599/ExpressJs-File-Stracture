const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    UserName: { type: String },
    ListSubject: { type: String },
    ListDescription: { type: String },
    TodoStatus: { type: String, default: "New" },
    CreateDate: { type: Date, default: Date.now() },
    UpdateDate: { type: Date, default: Date.now() },
  },
  {
    versionKey: false,
  }
);

const TodoListModel = mongoose.model("TodoLists", dataSchema);

module.exports = TodoListModel;
