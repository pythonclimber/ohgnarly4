var ChatUser = require('../models/server.chat-user');
var Category = require('../models/server.category');
var UserContact = require('../models/server.userContact');
const authentication = require('../services/authentication');

module.exports.login = function(req, res) {
    let username = req.body.userName.toLowerCase();
    ChatUser.findOne({userName: username}, (err, user) => {
        if (err) {
            console.error(err);
            return res.send({success: false, userId: null});
        }
        
        //let encryptedPassword = authentication.encryptString(req.body.password);
        let storedPassword = !!user ? user.password : '';
        if (user && storedPassword == req.body.password) {
            res.send({success: true, userId: user._id});
        } else {
            res.send({success: false, userId: null});
        }
    });
};

module.exports.createUser = function(req, res) {
    res.send({success: false});
};

module.exports.getUsers = function(req, res) {
    ChatUser.find().exec((err, users) => {
        if (err) {
            return console.error(err);
        }

        res.send(users);
    });
};

module.exports.getCategories = function(req, res) {
    Category.find().exec((err, categories) => {
        if (err) {
            return console.error(err);
        }

        res.send(categories);
    });
};

module.exports.getContacts = function(req, res) {
    UserContact.find({userId: req.params.userId}).exec((err, contacts) => {
        ChatUser.find({_id: {"$in": contacts.map(e => e.contactId)}}).exec((err, users) => {
            if (err) {
                return console.error(err);
            }

            res.send(users);
        });
    });
};