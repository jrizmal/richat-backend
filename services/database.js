const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION, {useNewUrlParser: true,useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Mongodb connected");
});

module.exports = {
    db
}