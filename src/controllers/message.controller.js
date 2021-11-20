const Pusher = require("pusher");

const express = require('express');
const router = express.Router();



const pusher = new Pusher({
    appId: "1301062",
    key: "0cbdecb2e64d2318a070",
    secret: "c7b8b3900404727120ef",
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