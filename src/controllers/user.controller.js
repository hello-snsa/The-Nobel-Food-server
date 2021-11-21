/*
    5 steps to register a user:
    ============================
// 1: check if user already exists.
// 2: if user exists then throw an error.
// 3: else create a user and then hash the password.
// 4: create a token.
// 5: Return Token and user info to the frontend.
*/

/*
    6 steps to login a user:
    ==========================
// 1: check if user already exists.
// 2: if user doesn't exists then throw an error.
// 3: if user exists then match the password.
// 4: if password don't match then through an error.
// 5: if password matches then create the token
// 6: return the token to the frontend
*/

require('dotenv').config();
const jwt = require("jsonwebtoken");
// const router = require("express").Router();

const User = require("../models/user.model");

// Function for creating Token:
const newToken = (user) => {
    return jwt.sign(
        { user: user },
        process.env.JWT_SECRET_KEY,
        { expiresIn: 60 * 5 });
};

//Creating new user
const register = async (req, res) => {

    try {
        // step 1:check if user already exists.
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        // step 2:if user exists then throw an error.
        if (user) {
            return res.status(400).json({ status: "error", message: "User already exists" });

        }
        // step 3: if user doesn't exist then create a user and then hash the password.
        user = await User.create(req.body);

        // step 4: Create the Token
        const token = newToken(user);

        // step 5: Return Token and user info to the frontend.
        return res.status(201).json({ user, token });

    } catch (err) {
        return res.status(500).json({ status: "failed", message: "something went wrong " + err });
    }
};

const login = async (req, res) => {
    //step 1: find the user

    const user = await User.findOne({ email: req.body.email }).exec();

    const userId = user._id;
    console.log("user id ", userId)
    // console.log("user id ", user)
    // step 2: if user doesn't exists then throw an error.
    try {
        if (!user)
            return res.status(401).json({ status: "failed", message: "email or password is not correct" });
    } catch (err) {
        return res.status(500).json({ status: "failed", message: "something went wrong " + err })
    }

    //step 3: if the user is present then match the userId with the password

    //decrypt the password first
    try {
        const match = await user.checkPassword(req.body.password);

        // 4: if password don't match then through an error.
        if (!match) {
            return res.status(401)
                .json({ status: "failed", message: "password incorrect" });
        }
    }
    catch (err) {
        return res.status(500).json({ status: "failed", message: "something went wrong " + err })
    }


    // 5: if password matches then create the token
    const token = newToken(user);

    // 6: return the token to the frontend
    return res.status(201).json({ _id: userId, data: { token } });

};



const getAllUsers = async (req, res) => {
    try {

        const users = await User.find({}).select('-password').lean().exec();

        return res.status(200).json({ data: users });


    } catch (err) {
        return res.status(400).json({ status: "failed", message: err });
    }

}

//single data


// GET A USER
const getUserId = async (req, res) => {
    // router.get("/:userId", async (req, res) => {
    try {
        // find the user with id
        const user = await User.findById(req.params.userId);

        // send everything except the password
        const { password, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// UPDATE USER
const updateUserId = async (req, res) => {
    // router.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json("Updated");
    } catch (err) {
        return res.status(500).json(err);
    }
};

// DELETE USER
const deleteId = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account deleted");
    } catch (err) {
        return res.status(500).json(err);
    }
};

// GET ALL FOLLOWINGS OF A USER
const getFollowing = async (req, res) => {
    try {
        // find the user with id
        const currentUser = await User.findById(req.params.id);
        const followingIds = currentUser.followings;

        const result = await User.find({ _id: { $in: followingIds } });
        res.status(200).json(result);
    } catch (err) {
        return res.status(500).json(err);
    }
};




module.exports = { register, login, getAllUsers, getUserId, updateUserId, deleteId, getFollowing };