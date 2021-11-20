//for establising connection
const express = require('express');
const cors = require('cors');
//to connect with database
const connect = require("./configs/db");

const helmet = require("helmet");
const morgan = require("morgan");
//
const checkController = require("./controllers/check.controller");
const messageController = require('./controllers/message.controller');
const orderRoute = require("./controllers/order.controller");
// const userController = require('./controllers/user.controller');
// const userController = require("./controllers/user.controller");
const { register, login, getAllUsers, getUserId, updateUserId, deleteId, getFollowing } = require("./controllers/user.controller");
//
const app = express();
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}))

//middleware express.json()
app.use(express.json());
app.use(cors());

app.use(helmet());
app.use(morgan("common"));

// Writing base route as a middleware
// app.use("/users", userController);
app.use("/check", checkController);
app.use('/api/messages', messageController);
app.use("/orders", orderRoute);
// app.use('/user', userController);

app.get("/:userId", getUserId)
app.put("/:id", updateUserId)
app.delete("/:id", deleteId)
app.get("/:id/followings", getFollowing)

app.post("/register", register)
app.post("/login", login)
app.get("/getAllUsers", getAllUsers)

//for 404 routing *note: put this as the last route
app.use(function (req, res, next) {
    return res.status(404).send("No route found. But don't worry. Server is still Running.")
});

const start = async () => {

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, async () => {
        try {
            await connect();
            console.log("Listening at port ", PORT);
        } catch (e) {
            console.log('Server disconnected!. Error: ', e);
        }
    });
}
module.exports = start;
