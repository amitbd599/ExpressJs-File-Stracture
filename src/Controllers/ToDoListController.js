const TodoListModel = require("../Models/TodoListModel");

// Create Profile
exports.CreateTodo = (req, res) => {
  let reqBody = req.body;

  let UserName = req.headers["username"];
  let ListSubject = reqBody["ListSubject"];
  let ListDescription = reqBody["ListDescription"];
  let TodoStatus = "New";
  let CreateDate = Date.now();
  let UpdateDate = Date.now();

  let PostBody = {
    UserName: UserName,
    ListSubject: ListSubject,
    ListDescription: ListDescription,
    TodoStatus: TodoStatus,
    CreateDate: CreateDate,
    UpdateDate: UpdateDate,
  };
  TodoListModel.create(PostBody, (error, data) => {
    if (error) {
      res.status(400).json({ status: "Fail", data: error });
    }
    res.status(200).json({ status: "Success", data: data });
  });
};

// Select Todo

exports.SelectTodo = (req, res) => {
  let UserName = req.headers["username"];

  TodoListModel.find({ UserName: UserName }, (err, data) => {
    if (err) {
      res.status(400).json({ status: "Fail", data: err });
    }
    res.status(200).json({ status: "Success", data: data });
  });
};

// Update Todo

exports.UpdateTodoList = (req, res) => {
  let reqBody = req.body;
  let UserName = req.headers["username"];
  let ListSubject = reqBody["ListSubject"];
  let ListDescription = reqBody["ListDescription"];
  let _id = reqBody["_id"];
  let UpdateDate = Date.now();

  let postBody = {
    ListSubject: ListSubject,
    ListDescription: ListDescription,
    UpdateDate: UpdateDate,
  };
  TodoListModel.updateOne(
    { UserName: UserName, _id: _id },
    { $set: postBody },
    { upsert: true },
    (error, data) => {
      if (error) {
        res.status(400).json({ status: "Fail", data: error });
      } else {
        res.status(200).json({ status: "Success", data: data });
      }
    }
  );
};

// Update Status

exports.UpdateStatus = (req, res) => {
  let reqBody = req.body;
  let UserName = req.headers["username"];

  let _id = reqBody["_id"];
  let TodoStatus = reqBody["TodoStatus"];
  let UpdateDate = Date.now();

  let postBody = {
    TodoStatus: TodoStatus,
    UpdateDate: UpdateDate,
  };

  TodoListModel.updateOne(
    { _id: _id, UserName: UserName },
    { $set: postBody },
    { upsert: true },
    (error, data) => {
      if (error) {
        res.status(400).json({ status: "Fail", data: error });
      } else {
        res.status(200).json({ status: "Success", data: data });
      }
    }
  );
};
exports.RemoveTodo = (req, res) => {
  let reqBody = req.body;
  let UserName = req.headers["username"];

  let _id = reqBody["_id"];

  TodoListModel.remove({ _id: _id, UserName: UserName }, (error, data) => {
    if (error) {
      res.status(400).json({ status: "Fail", data: error });
    } else {
      res.status(200).json({ status: "Success", data: data });
    }
  });
};

exports.SelectTodoByStatus = (req, res) => {
  let reqBody = req.body;
  let UserName = req.headers["username"];
  let TodoStatus = reqBody["TodoStatus"];
  TodoListModel.find(
    { UserName: UserName, TodoStatus: TodoStatus },
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "Fail", data: err });
      }
      res.status(200).json({ status: "Success", data: data });
    }
  );
};

exports.SelectTodoByDate = (req, res) => {
  let reqBody = req.body;
  let UserName = req.headers["username"];
  let FormDate = reqBody["FormDate"];
  let ToDate = reqBody["ToDate"];

  TodoListModel.find(
    {
      UserName: UserName,
      CreateDate: { $gte: new Date(FormDate), $lte: new Date(ToDate) },
    },
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "Fail", data: err });
      }
      res.status(200).json({ status: "Success", data: data });
    }
  );
};
