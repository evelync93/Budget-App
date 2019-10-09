const { Category, Transaction } = require("../../db/index.js");

module.exports = {
  newTransaction: data => {
    const newtransaction = new Transaction({
      date: data.date,
      description: data.description,
      amount: data.amount,
      transaction_type: data.transaction_type,
      category_name: data.category_name,
      account_name: data.account_name
    });
    return newtransaction.save();
  },
  createOrUpdateCategory: category => {
    const newcategory = {
      name: category.name,
      budget: category.budget
    };
    console.log(newcategory);
    return Category.findOneAndUpdate({ name: category.name }, category, { upsert: true, useFindAndModify: false }).catch(err => {
      console.log(err);
    });
  },

  getAllTransactions: () => {
    //get transactions
    return Transaction.find()
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  getAllCategories: () => {
    return Category.find()
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  addManyTransactions: newTransactions => {
    return Transaction.insertMany(newTransactions).catch(err => {
      console.log(err);
    });
  },

  getAllTransactionsByDate: range => {
    return Transaction.find({ date: { $gte: `${range.start}T00:00:00Z`, $lt: `${range.end}T00:00:00Z` } })
      .then(data => {
        return data;
      })
      .catch(err => {
        return err;
      });
  }
};
