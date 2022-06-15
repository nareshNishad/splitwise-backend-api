const express = require("express");
const user = require("./users");
const expense = require("./expense");
const settle = require("./settle");

const router = express.Router();

// To authenticate the user
// Body: {email, password}
router.post("/login", user.login);

// To Register the user
// Body: {email, password, name}
router.post("/register", user.register);

// To Find the user info
// Parms: id=user_id
router.get("/users/:id", user.findUser);

// To show the all user info
router.get("/users", user.findAllUsers);

// To add a expense
router.post("/expense", expense.addExpense);

// TO view all dues
router.get("/dues/:user_id", expense.getDues);

// To view expense added by user
router.get("/expense/:user_id", expense.getExpenses);

// To settle a dues
router.post("/settle", settle.settleDues);

module.exports = router;
