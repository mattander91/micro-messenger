const mongoose = require('mongoose');
let DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/micro_messenger';

mongoose.connect(DB_URI, { useMongoClient: true });

let Users = mongoose.model(
  'Users', {
    username: {
      type: String,
      unique: true
    },
    password: String
  }
);

let Groups = mongoose.model(
  'Groups', {
    name: {
      type: String,
      unique: true
    }
  }
);

let Messages = mongoose.model(
  'Messages', {
    group: String,
    messages: [mongoose.Schema.Types.Mixed]
  }
);

module.exports.Users = Users;
module.exports.Groups = Groups;
module.exports.Messages = Messages;