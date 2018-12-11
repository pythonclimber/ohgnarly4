var exports = module.exports = {};
var Movie = require('../models/server.movie');
var imdb = require('imdb-api');
var formats = require('../infrastructure/formats');

module.exports.getMovies = (req, res) => {
    Movie.find({userId: req.params.userId}).exec((err, movies) => {
        if (err) {
            res.send([]);
            return;
        }

        res.send(movies);
    });
};

module.exports.createMovie = (req, res) => {
    var movie = new Movie({
        title: req.body.title, 
        description: req.body.description, 
        userId: req.body.userId, 
        director: req.body.director,
        imdbid: req.body.imdbid,
        wishlist: req.body.wishlist,
        format: req.body.format || ''
    });
    movie.save();
    res.send(movie);
};

module.exports.getMovieDetails = (req, res) => {
    var onlineId = req.params.onlineId;
    if (onlineId) {
        imdb.getById(onlineId, {apiKey: '1e37ecbf'}).then(movie => {
            
            res.send({success: true, movie: movie});
        }).catch(error => {
            res.send({success: false});
        });
    } else {
        res.send({success: false, error: 'An online ID is required'});
    }
};

module.exports.searchMovies = (req, res) => {
    var title = req.params.title;
    var page = req.params.page;
    if (title) {
        imdb.search({title: title, reqtype: 'movie'}, {apiKey: '1e37ecbf'}, page).then(response => {
            res.send({success: true, results: response.results, totalResults: response.totalresults});
        }).catch(error => {
            console.log('error', error);
            res.send({success: false, error: error});
        });
    }  else {
        res.send({success: false, error: 'Movie title is required!'});
    }
};

module.exports.deleteMovie = (req, res) => {
    console.log(req.params.userId, req.params.imdbid);
    Movie.remove({userId: req.params.userId, imdbid: req.params.imdbid}, err => {
        if (err) {
            res.send({success: false, error: err});
            return;
        }

        res.send({success: true});
    });
};

module.exports.getFormats = function(req, res) {
    var results = [];
    
    for (let format in formats.formats) {
        results.push(formats.formats[format]);
    }

    res.send(results);
};

module.exports.updateMovie = (req, res) => {
    var query = {userId: req.body.userId, imdbid: req.body.imdbid};
    var update = req.body.update;
    Movie.findOneAndUpdate(query, update, response => {
        console.log(response);
        res.send({success: true, movie: response});
    });
};