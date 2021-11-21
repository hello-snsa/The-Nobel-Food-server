const Pusher = require("pusher");

const express = require('express');
const router = express.Router();



const pusher = new Pusher({
    appId: "1300122",
    key: "fdd045e594b7c2c50324",
    secret: "381b2b8bb78b44bf5945",
    cluster: "ap2",
    useTLS: true
});

router.post('/', async (req, res) => {
    await pusher.trigger("chat", "message", {
        username: req.body.username,
        message: req.body.message
    });

    res.json([]);
});



module.exports = router;