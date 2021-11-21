const mongoose = require("mongoose");
const User = require("./user.model");


const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
    chapatiQuantity: { type: Number },
    riceQuantity: { type: Number },
    dalQuantity: { type: Number },
    vegetablesQuantity: { type: Number },
    isRaw: { type: Boolean, default: false, required: true },
    isVeg: { type: Boolean, default: false, required: true },
    others: { type: Number },
    isCompleted: { type: Boolean, default: false },
    currentLocation: { type: String, default: "" },
    isOrderSelected: { type: String, default: false },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("order", orderSchema);
