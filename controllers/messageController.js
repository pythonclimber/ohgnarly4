module.exports = function(io) {    
    let exports = {};
    const Message = require('../models/server.message');

    exports.getMessages = function(req, res) {
        Message.find({createdAt: {$gt: new Date(Date.now() - (24 * 60 * 60 * 1000))}}).exec((err, messages) => {
            if (err) {
                return console.error(err);
            }

            res.send(messages);
        });
    };

    exports.createMessage = function(req, res) {
        var message = new Message({messageBody: req.body.messageBody, userId: req.body.userId});
        message.save();
        io.emit('chat-message', message);
        res.status(200).end();
    };

    exports.getAllMessages = function(req, res) {
        var userId = req.params.userId;
        Message.find({userId: {$eq: userId}}).exec((err, messages) => {
            if (err) {
                return console.error(err);
            }

            res.send(messages);
        });
    };

    exports.searchMessages = function(req, res) {
        var searchDate = req.body.searchDate;
        var searchText = req.body.searchText;
        console.log(req.body);

        if (searchDate) {
            var startDate = new Date(searchDate);
            var endDate = new Date(searchDate);
            endDate.setDate(endDate.getDate() + 1);
            Message.find({createdAt: {$gt: startDate, $lt: endDate}}).exec((error, messages) => {
                if (error) {
                    return console.error(error);
                }

                res.send(messages);
            });
        } else if(searchText) {
            Message.find({messageBody: {$regex: searchText, $options: 'i'}}).exec((error, messages) => {
                if (error) {
                    return console.error(error);
                }

                res.send(messages);
            });
        } else {
            res.send({error: 'Must provide search value'});
        }
    };

    exports.addMessage = (msg) => {
        var message = new Message({messageBody: msg.messageBody, userId: msg.userId});
        message.save();
        io.emit('chat-message', message);
    }

    return exports;
};