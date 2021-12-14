//for establising connection
const express = require('express');
const cors = require('cors');
//to connect with database
const connect = require("./configs/db");

const webSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer();

const wsServer = new webSocketServer({
    httpServer: server
});

const clients = {};

const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
    var userID = getUniqueID();
    console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');

    // You can rewrite this part of the code to accept only the requests from allowed origin
    const connection = request.accept(null, request.origin);
    clients[userID] = connection;
    console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));

    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ', message.utf8Data);

            // broadcasting message to all connected clients
            for (key in clients) {
                clients[key].sendUTF(message.utf8Data);
                console.log('sent Message to: ', clients[key]);
            }
        }
    }
    )
}

);



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

app.use(cors());



// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200', 'https://hackathon-masai.herokuapp.com']
// }))

//middleware express.json()
app.use(express.json());

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
