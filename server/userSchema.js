const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    f_name: String,
    l_name: String,
    username: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;