const express = require('express');
const bodyParser = require('body-parser');
const UsersModel = require('../database/index.js').Users;
const MessagesModel = require('../database/index.js').Messages;
const GroupsModel = require('../database/index.js').Groups;
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const path = require('path');

let app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist/')));


let port = process.env.PORT || 3000;


app.post('/signup', (req, res) => {
  let name = req.body.username;
  let pass = req.body.password;
  let hash = bcrypt.hashSync(pass, salt);
  let newUser = new UsersModel({
    username: name,
    password: hash
  });
  newUser.save(err => {
    if (err) {
      console.log('error ' + err);
      res.sendStatus(500);
    } else {
      console.log('user ' + name + ' saved');
      res.sendStatus(202);
    }
  });
});

app.post('/login', (req, res) => {
  let username = req.body.loginUsername;
  let password = req.body.loginPassword;
  UsersModel.findOne({username: username}, (err, data) => {
    if (err) {
      console.log('error: ', err);
    } else {
      let passwordCompare = data.password;
      bcrypt.compare(password, passwordCompare, (err, match) => {
        if (match) {
          console.log('match: ', match);
          res.sendStatus(201);
        } else {
          console.log('user not found/invalid credentials');
          res.sendStatus(500);
        }
      });
    }
  });
});

app.post('/group', (req, res) => {
  let groupName = req.body.groupName;
  let groupMongoInstance = new GroupsModel({
    name: groupName
  });
  groupMongoInstance.save(err => {
    if (err) {
      console.log('error group name likely exists: ');
      res.sendStatus(500);
    } else {
      console.log('group ' + groupName + ' saved');
      res.sendStatus(202);
    }
  });
});

app.get('/getGroups', (req, res) => {
  GroupsModel.find({}, (err, data) => {
    if (err) {
      console.log('error getting /getGroups: ', err);
      req.sendStatus(500);
    } else {
      res.status(200);
      let groupNames = data.map(group => {
        return {groupName: group.name}
      });
      res.send(groupNames);
    }
  });
});

app.delete('/deleteGroup', (req, res) => {
  let groupName = req.body.groupName;
  GroupsModel.remove({name: groupName}, (err, data) => {
    if (err) {
      console.log('error: ', err);
      res.sendStatus(500);
    } else {
      console.log(groupName + ' removed successfully');
      res.sendStatus(202);
    }
  });
});

app.post('/message', (req, res) => {
  let group = req.body.group;
  let messageObj = {user: req.body.username, message: req.body.message}
  MessagesModel.findOne({group: group}, (err, data) => {
    if (err) {
      console.log('error on message post: ', err);
      res.sendStatus(500);
    } else if (!data) {
      let newMessage = new MessagesModel({
        group: group,
        messages: messageObj
      });
      newMessage.save(err => {
        if (err) {
          console.log('error saving new collection: ', err);
          res.sendStatus(500);
        } else {
          console.log('new collection saved');
          res.sendStatus(201);
        }
      });
    } else {
      MessagesModel.update({group: group}, {$addToSet: {messages: messageObj}}, (err, data) => {
        if (err) {
          console.log('error updating collection: ', err);
        } else {
          console.log('collection updated');
          res.sendStatus(201);
        }
      });
    }
  });
});

app.get('/getMessages', (req, res) => {
  MessagesModel.findOne({group: req.query.groupName}, (err, data) => {
    if (err) {
      console.log('error getting /getMessages: ', err);
      req.sendStatus(500);
    } else if (data) {
      res.status(200);
      let messages = data.messages.map(message => {
        return {
          message: message.message,
          username: message.user
        }
      });
      res.send(messages);
    } else {
      res.status(200);
      res.send([]);
    }
  });
});

app.delete('/deleteMessages', (req, res) => {
  let groupName = req.body.groupName;
  MessagesModel.remove({group: groupName}, (err, data) => {
    if (err) {
      console.log('error: ', err);
      res.sendStatus(500);
    } else {
      console.log('messages in ' + groupName + ' removed successfully');
      res.sendStatus(202);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});