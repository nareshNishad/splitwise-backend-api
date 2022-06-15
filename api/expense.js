const { successResponse, errorResponse } = require("./helper");
const { Expense, Relation, sequelize, Sequelize } = require("../models");

const addExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { owner, description, amount, members } = req.body;

    total_spending = 0;
    for (let i = 0; i < members.length; i++) {
      total_spending += members[i]["share"];
    }
    // Check the share and amount are equal
    if (total_spending !== amount) {
      throw new Error("Total amount and total share do not match");
    }
    const expense = await Expense.create({ ...req.body }, { transaction: t });

    let payload = [];
    for (let i = 0; i < members.length; i++) {
      let temp = {
        owner: owner,
        expense_id: expense.dataValues.expense_id,
      };
      temp["lender"] = members[i]["user_id"];
      temp["amount"] = members[i]["share"];
      payload.push(temp);
    }
    await Relation.bulkCreate(payload, { transaction: t });
    await t.commit();
    return successResponse(req, res, {}, 201);
  } catch (error) {
    await t.rollback();
    return errorResponse(req, res, error.message);
  }
};

const getDues = async (req, res) => {
  try {
    const id = req.params.user_id;
    const totalAmountYouGet = await Relation.findAll({
      where: {
        owner: id,
        lender: { [Sequelize.Op.not]: id }, // remove as you don't owns money to yourself
      },
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("amount")), "amount"],
        "lender",
      ],
      group: ["lender"],
    });

    const totalAmountYouPay = await Relation.findAll({
      where: {
        lender: id,
        owner: { [Sequelize.Op.not]: id }, // remove as you don't owns money to yourself
      },
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("amount")), "amount"],
        "owner",
      ],
      group: ["owner"],
    });

    const output = {
      totalAmountYouGet,
      totalAmountYouPay,
    };

    return successResponse(req, res, { output }, 200);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

const getExpenses = async (req, res) => {
  try {
    const id = req.params.user_id;
    const expenses = await Expense.findAll({
      where: {
        owner: id,
      },
      attributes: ["amount", "createdAt", "expense_id"],
    });

    return successResponse(req, res, { expenses }, 200);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

module.exports = { addExpense, getDues, getExpenses };
