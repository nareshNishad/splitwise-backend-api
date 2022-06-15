const { successResponse, errorResponse } = require("./helper");
const { Expense, Relation, Settle, sequelize } = require("../models");

const settleDues = async (req, res) => {
  // To make sure either all or none transaction happen
  const t = await sequelize.transaction();
  try {
    const { payer_id, payto_id, amount, expense_id } = req.body;

    const expense = await Expense.findOne({
      where: {
        expense_id,
      },
    });
    if (expense === null) {
      throw new Error(`No Expense with expense_id ${expense_id}`);
    }

    let { members } = expense;

    let updateAmount;
    for (let i = 0; i < members.length; i++) {
      // Update the amount
      if (members[i]["user_id"] === payer_id) {
        members[i]["share"] -= amount;
        updateAmount = members[i]["share"];
        if (updateAmount < 0) {
          throw new Error("You cannot pay more then the money you owe");
        }
      }
    }

    // Update the expense
    await Expense.update(
      { members: members },
      {
        where: {
          expense_id: expense_id,
        },
      },
      { transaction: t }
    );

    // Update the dues
    await Relation.update(
      { amount: updateAmount },
      {
        where: {
          expense_id: expense_id,
          lender: payer_id,
        },
      },
      { transaction: t }
    );

    // To create a settlement record for future purpuse
    await Settle.create(
      {
        payer: payer_id,
        paidTo: payto_id,
        amount: amount,
        expense_id: expense_id,
      },
      { transaction: t }
    );
    await t.commit();
    return successResponse(req, res, {}, 201);
  } catch (error) {
    // Rollback any completed transaction in case of error
    await t.rollback();
    return errorResponse(req, res, error.message);
  }
};

module.exports = { settleDues };
