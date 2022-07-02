const express = require("express");
const ProfileController = require("../Controllers/ProfileController");
const TodoListController = require("../Controllers/ToDoListController");
const AuthVerifyToken = require("../Middleware/AuthVerifyToken");
const router = express.Router();

router.post("/createProfile", ProfileController.CreateProfile);
router.post("/userLogin", ProfileController.UserLogin);
router.get("/getProfile", AuthVerifyToken, ProfileController.getProfile);
router.post("/updateProfile", AuthVerifyToken, ProfileController.upDateProfile);

// Todo API
router.post("/createTodo", AuthVerifyToken, TodoListController.CreateTodo);
router.post("/SelectTodo", AuthVerifyToken, TodoListController.SelectTodo);
router.post(
  "/UpdateTodoList",
  AuthVerifyToken,
  TodoListController.UpdateTodoList
);
router.post("/UpdateStatus", AuthVerifyToken, TodoListController.UpdateStatus);
router.post("/RemoveTodo", AuthVerifyToken, TodoListController.RemoveTodo);
router.post(
  "/SelectTodoByStatus",
  AuthVerifyToken,
  TodoListController.SelectTodoByStatus
);
router.post(
  "/SelectTodoByDate",
  AuthVerifyToken,
  TodoListController.SelectTodoByDate
);

module.exports = router;
