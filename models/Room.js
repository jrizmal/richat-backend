const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const roomSchema = new mongoose.Schema({
    name: String,
    team: { type: Schema.Types.ObjectId, ref: "Team" },
    members: [
        { type: Schema.Types.ObjectId, ref: 'User' }
    ]
})

const Room = mongoose.model("Room", roomSchema, "Rooms")

module.exports = {
    Room
}