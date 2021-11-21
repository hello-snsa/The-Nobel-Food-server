const router = require("express").Router();
const User = require("../models/user.model");
const Order = require("../models/order.model");

// GET AN ORDER
router.get("/:orderId", async (req, res) => {
  try {
    // find the post with id
    const order = await Order.findById(req.params.orderId).populate("userId").populate("receiverId");


    res.status(200).json(order);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

// CREATE AN ORDER
router.post("/", async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    // find the user with id
    const order = await newOrder.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE AN ORDER
router.put("/:orderId", async (req, res) => {
  try {
    // const order = await Order.findById(req.params.orderId);
    const order = await Order.findByIdAndUpdate(req.params.orderId, { $set: req.body });
    res.status(200).json("Order updated");
    // if (order.userId === req.body.userId) {
    //   await order.updateOne({ $set: req.body });
    //   res.status(200).json("Order updated");
    // } else {
    //   res.status(403).json("you can't update another users order");
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE A POST
router.delete("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (order.userId === req.body.userId) {
      await order.deleteOne();
      res.status(200).json("Order deleted");
    } else {
      res.status(403).json("you can't delete another users order");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL ORDERS BY A USER
router.get("/user/:userId", async (req, res) => {
  try {
    // const user = await User.findOne({ userId: req.params.userId });
    const userOrders = await Order.find({ userId: req.params.userId });

    res.status(200).json(userOrders);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET ALL ORDERS BY A Reciever
router.get("/receiver/:receiverId", async (req, res) => {
  try {
    // const user = await User.findOne({ userId: req.params.userId });
    const receiverOrders = await Order.find({ receiverId: req.params.receiverId });

    res.status(200).json(receiverOrders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     // const user = await User.findOne({ userId: req.params.userId });
//     console.log("get req")
//     const getOrders = await Order.find().lean().exec();

//     res.status(200).json(getOrders);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


router.get("/", async (req, res) => {
  try {
    // find the post with id.
    console.log("hjhhglkhjvkgflkuglj")
    const order = await Order.find().populate("userId").populate("receiverId");


    res.status(200).json(order);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

module.exports = router;
