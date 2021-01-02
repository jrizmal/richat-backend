const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
    fbId: String,
    email: String,
    photoURL: String,
    teams: [
        { type: Schema.Types.ObjectId, ref: 'Team' }
    ]
})

const User = mongoose.model("User", userSchema, "Users")

module.exports = {
    User
}