const mongoose = require("mongoose");

//Created a analytical Schema that record all the schema and fetch only the selected field thanks to "select:false"

const analyticalSchema = new mongoose.Schema({
  loginUser: {
    type: Number,
    default: 0,
    // select: false
  },
  SinginUser: {
    type: Number,
    default: 0,
    // select: false
  },
  SingoutUser: {
    type: Number,
    default: 0,
    // select: false
  },
  total_orders: {
    type: Number,
    default: 0,
    // select: false
  },
  cancel_orders: {
    type: Number,
    default: 0,
    // select: false
  },
  process_order: {
    type: Number,
    default: 0,
    // select: false
  },
  total_product: {
    type: Number,
    default: 0,
    // select: false
  },
  stock_product: {
    type: Number,
    default: 0,
    // select: false
  },
  stock_out_product: {
    type: Number,
    default: 0,
    // select: false
  },
  lifetime_sales: {
    type: Number,
    default: 0,
    // select: false
  },
  lifetime_profit: {
    type: Number,
    default: 0,
    // select: false
  },
  total_cost: {
    type: Number,
    default: 0,
    // select: false
  }
});

const Analytical = mongoose.model("Analytical", analyticalSchema);

module.exports = Analytical;
