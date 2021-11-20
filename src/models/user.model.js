const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Creating schema
const userSchema = new mongoose.Schema({

    name: { type: String, required: true, max: 50 },
    email: { type: String, required: true, unique: true, max: 50 },
    password: { type: String, required: true, min: 6 },
    phoneNumber: { type: String },
    profilePicture: { type: String, default: "" },
    userType: { type: String, default: "" },
    address: { type: String, max: 200, default: "" },
    donations: { type: Array, default: [] },
    served: { type: Array, default: [] },
    noOfNgoMembers: { type: Number },
    currentLocation: { type: String, default: "" },
},
    { timestamps: true, versionKey: false }
);

// Function for Hashing.
userSchema.pre("save", function (next) {
    if (!this.isModified('password')) {

        return next();
    }

    // Hashing done below.
    const hash = bcrypt.hashSync(this.password, 6);

    // Setting hashed password
    this.password = hash;
    return next();

})

// Checking Password.
userSchema.methods.checkPassword = function (password) {

    return bcrypt.compareSync(password, this.password)

}


module.exports = mongoose.model('user', userSchema);
