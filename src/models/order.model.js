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
    },
    chapatiQuantity: { type: Number },
    riceQuantity: { type: Number },
    dalQuantity: { type: Number },
    vegetablesQuantity: { type: Number },
    isRaw: { type: Boolean, default: false },
    isVeg: { type: Boolean, default: false },
    others: { type: Number },
    isCompleted: { type: Boolean, default: false },
    servedBy: { type: String, default: "" },
    currentLocation: { type: String, default: "" },
    isOrderSelected: { type: Boolean, default: false },
    latitude: { type: String, default: "" },
    longitude: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("order", orderSchema);
