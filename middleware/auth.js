const admin = require("firebase-admin");
const { User } = require("../models/user");
const serviceAccount = require("./fbadmin.json");
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mycar-6d0a2.firebaseio.com"
});

module.exports = async function (req, res, next) {
    if (req.headers['authorization']) {
        const token = req.headers['authorization']
        app.auth().verifyIdToken(token).then(async (decoded) => {
            console.log("token ok, checking if user exists");
            console.log(decoded.uid);
            const user = await User.findOne({fbId: decoded.uid}).exec()
            if(!user){
                user = new User({
                    fbId: decoded.uid,
                    email: decoded.email,
                    photoURL: decoded.picture,
                    teams: []
                })
                user = await user.save()
            }
            req.user = user
            next()
        }).catch(err => {
            console.log(err);
            res.sendStatus(403)
        })
    } else {
        res.sendStatus(403)
    }

}