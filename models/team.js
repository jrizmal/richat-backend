const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const teamSchema = new mongoose.Schema({
    name: String,
    members: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ]
})

const Team = mongoose.model("Team", teamSchema, "Teams")

module.exports = {
    Team
}