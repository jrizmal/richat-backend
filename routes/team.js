var express = require('express');
const authenticated = require('../middleware/auth');
const { Room } = require('../models/Room');
const { Team } = require('../models/team');
const { User } = require('../models/user');
var router = express.Router();

router.get("/all",async (req,res)=>{
    const teams = await Team.find({}).populate('members').exec()
    res.json(teams)
})

router.get("/all",async (req,res)=>{
    const teams = await Team.find({}).populate('members').exec()
    res.json(teams)
})

router.post("/:team_id/join", authenticated, async(req, res)=>{
    const teamId = req.params.team_id
    const team = await Team.findById(teamId).exec()
    if(!team){
        res.status(404).json({message: "Team doesn't exist."})
        return
    }
    console.log(req.user);
    const userId = req.user._id
    team.members.push(userId)
    await team.save()
    res.json({message: "Added to team."})
})
router.get("/my", authenticated, async(req, res)=>{
    const user = req.user
    const teams = await Team.find({members: user._id}).exec()
    console.log(teams);
    res.json(teams)
})

router.get("/:team/rooms", authenticated, async(req, res)=>{
    const teamId = req.params.team
    const rooms = await Room.find({team: teamId}).exec()
    res.json(rooms)
})

router.post("/:team/rooms/add", authenticated, async(req, res)=>{
    if(req.body.room_name){
        const teamId = req.params.team
        const room = new Room({
            name: req.body.room_name,
            team: teamId,
            members: [
                req.user._id,
            ]
        })
        
        res.json(await room.save())
    }else{
        res.sendStatus(400)
    }
    
})

module.exports = router;