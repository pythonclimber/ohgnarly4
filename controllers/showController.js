var Show = require('../models/server.show');
var imdb = require('imdb-api');

module.exports.getUserShows = function(req, res) {
    console.log(req.params.userId);
    Show.find({userId: req.params.userId}).exec((err, shows) => {
        if (err) {
            res.send([]);
            return;
        }

        res.send(shows);
    });
};

module.exports.createShow = function(req, res) {
    var show = new Show({
        title: req.body.title,
        userId: req.body.userId,
        year: req.body.year,
        imdbid: req.body.imdbid
    });
    
    show.save();

    res.send({success: true, show: show});
}

module.exports.updateShow = function(req, res) {
    var query = {userId: req.body.userId, imdbid: req.body.imdbid};
    var update = {favorite: req.body.favorite};
    Show.findOneAndUpdate(query, update, response => {
        res.send({success: true, movie: response});
    });
}

module.exports.searchShows = function(req, res) {
    var title = req.params.title;
    var page = req.params.page;
    if (title) {
        imdb.search({title: title, reqtype: 'series'}, {apiKey: '1e37ecbf'}, page).then(response => {
            res.send({success: true, results: response.results, totalResults: response.totalresults});
        }).catch(error => {
            console.log('error', error);
            res.send({success: false, error: error});
        });
    } else {
        res.send({success: false, error: 'Show title is required!'});
    }
}