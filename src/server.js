//for establising connection
const express = require('express');

//to connect with database
const connect = require("./configs/db");
//
const checkController = require("./controllers/check.controller");
// const userController = require("./controllers/user.controller");
const { register, login, getAllUsers } = require("./controllers/user.controller");
//
const app = express();

//middleware express.json()
app.use(express.json());

// Writing base route as a middleware
// app.use("/users", userController);
app.use("/check", checkController);

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
