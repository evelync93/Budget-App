const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/budget", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("budget database connected");
});

const transactionsSchema = new mongoose.Schema({
  date: Date,
  description: String,
  amount: Number,
  transaction_type: String,
  category_name: String,
  account_name: String
});

const Transaction = mongoose.model("Transaction", transactionsSchema);

const categorySchema = new mongoose.Schema({
  name: String,
  budget: Number
});

const Category = mongoose.model("Category", categorySchema);

module.exports.Category = Category;
module.exports.Transaction = Transaction;
