const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    receiverId: { type: String, required: false, default: "" },
    chapatiQuantity: { type: Number },
    riceQuantity: { type: Number },
    dalQuantity: { type: Number },
    vegetablesQuantity: { type: Number },
    isRaw: { type: Boolean, default: false, required: true },
    isVeg: { type: Boolean, default: false, required: true },
    others: { type: Number },
    isCompleted: { type: Boolean, default: false },
    currentLocation: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("order", orderSchema);
